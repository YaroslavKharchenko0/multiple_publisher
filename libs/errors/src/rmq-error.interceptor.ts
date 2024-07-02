import { createErrorResponse } from '@app/contracts';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RmqErrorService } from './rmq-error.service';
import { CognitoIdentityProviderServiceException } from '@aws-sdk/client-cognito-identity-provider';


@Injectable()
export class RmqErrorInterceptor<T>
  implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ) {
    const isRmqContext = isRabbitContext(context);

    if (!isRmqContext) {
      return next.handle();
    }

    return next
      .handle()
      .pipe(catchError((error) => {
        if (error instanceof CognitoIdentityProviderServiceException) {
          const httpStatusCode = error.$metadata.httpStatusCode || 403;

          return of(createErrorResponse(httpStatusCode, error.message));
        }

        if (error instanceof RmqErrorService) {
          return of(createErrorResponse(error.statusCode, error.message));
        }

        if (error instanceof Error) {
          return of(createErrorResponse(500, error.message));
        }

        return of(createErrorResponse(500, "Errors"))
      }));
  }
}
