import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;
  @IsBoolean()
  isTfaEnabled: boolean;
}
