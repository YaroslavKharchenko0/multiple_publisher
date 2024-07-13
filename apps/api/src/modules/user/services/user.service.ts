import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUser,
  Options,
  Service,
  UpdateUser,
} from './user.service.interface';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { USER_REPOSITORY } from '../providers/user.service.provider';
import { RmqErrorService } from '@app/errors';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UserCreatedEvent } from '@app/contracts';
import { Cognito, CognitoService } from '@app/aws';

@Injectable()
export class UserService implements Service {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repository: UserRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly amqpConnection: AmqpConnection,
    @Cognito() private readonly cognitoService: CognitoService,
  ) {}

  async createUser(input: CreateUser, options: Options): Promise<UserModel> {
    const userEntities = await this.repository.createOne(input);

    const [userEntity] = userEntities;

    if (!userEntity) {
      throw this.rmqErrorService.notFound();
    }

    const userModel = UserModel.fromEntity(userEntity);

    await this.amqpConnection.publish<UserCreatedEvent.Request>(
      UserCreatedEvent.exchange,
      UserCreatedEvent.routingKey,
      userModel,
      {
        headers: {
          traceId: options?.traceId,
        },
      },
    );

    await this.cognitoService.setCustomClaims({
      email: input.email,
      claims: {
        app_id: userEntity.id.toString(),
      },
    });

    return userModel;
  }
  async findUserById(id: number): Promise<UserModel> {
    const userEntity = await this.repository.findById(id);

    if (!userEntity) {
      throw this.rmqErrorService.notFound();
    }

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async findUserByEmail(email: string): Promise<UserModel> {
    const userEntity = await this.repository.findByEmail(email);

    if (!userEntity) {
      throw this.rmqErrorService.notFound();
    }

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async findUserByProviderId(id: string): Promise<UserModel> {
    const userEntity = await this.repository.findByProviderId(id);

    if (!userEntity) {
      throw this.rmqErrorService.notFound();
    }

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async updateUserById(id: number, input: UpdateUser): Promise<UserModel> {
    const userEntities = await this.repository.updateById(id, input);

    const [userEntity] = userEntities;

    if (!userEntity) {
      throw this.rmqErrorService.notFound();
    }

    await this.cognitoService.updateUserAttributes(userEntity.email, input);

    const userModel = UserModel.fromEntity(userEntity);

    return userModel;
  }
  async deleteUserById(id: number): Promise<void> {
    const deletedUsers = await this.repository.deleteById(id);

    const userEmails = deletedUsers.map((user) => user.email);

    const promises = userEmails.map((email) =>
      this.cognitoService.deleteUser(email),
    );

    await Promise.all(promises);
  }
}
