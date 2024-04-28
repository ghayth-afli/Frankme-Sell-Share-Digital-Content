import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

// Decorator that marks a handler or class as public [default is private]
export const Auth = (...authType: AuthType[]) =>
  SetMetadata('authType', authType);
