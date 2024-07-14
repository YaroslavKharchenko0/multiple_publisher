import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountFacade } from "../facades";
import { ACCOUNT_ACCESS_KEY } from "../decorators/account-access.decorator";
import { JWTUser } from "../decorators";
import { Account } from "@app/validation";
import { randomUUID } from "crypto";

const accountIdKey = 'accountId';

@Injectable()
export class AccountAccessGuard {
  constructor(private readonly reflector: Reflector, private readonly accountFacade: AccountFacade) { }

  async find(params: Record<string, string>) {
    const traceId = `account-access-${randomUUID()}`

    const accountId = Number(params?.[accountIdKey]);

    if (!accountId) {
      return null;
    }

    const account = await this.accountFacade.findAccountById(accountId, traceId);

    return account;
  }

  async checkAccess(jwtUser: JWTUser, account: Account) {
    return jwtUser.isMe(account.userId);
  }

  async canActivate(context: ExecutionContext) {
    const isEnabled = this.reflector.getAllAndOverride<boolean>(ACCOUNT_ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isEnabled) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const jwtUser: JWTUser | undefined | null = request?.user;

    if (!jwtUser) {
      return false;
    }

    if (jwtUser.isAdmin()) {
      return true;
    }

    const params = request.params;

    const account = await this.find(params);

    if (!account) {
      return false;
    }

    return this.checkAccess(jwtUser, account);
  }
}
