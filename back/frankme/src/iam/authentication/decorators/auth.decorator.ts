import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/auth-type.enum";

export const Auth = (...authType: AuthType[]) =>
  SetMetadata("authType", authType);
