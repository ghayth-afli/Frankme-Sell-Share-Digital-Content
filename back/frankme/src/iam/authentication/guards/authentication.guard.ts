import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private reflector: Reflector,
    private accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>('authType', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    let error = new UnauthorizedException();
    /* For each guard we call its "canActivate" method
      In case of type 0 => AuthType.Bearer we call our access-token guard
      In case of type 1 => AuthType.None we call canActivate which returns true
      Else we throw an error
    */
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => (error = err));

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
