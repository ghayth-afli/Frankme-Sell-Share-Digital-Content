import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsUrl()
  file: string;
}
