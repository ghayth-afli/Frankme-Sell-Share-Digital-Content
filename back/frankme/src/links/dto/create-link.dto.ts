import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsUrl()
  url: string;
  @IsPositive()
  price: number;
  @IsString()
  @IsOptional()
  expirationDate?: string;
  @IsBoolean()
  isActive: boolean;
  @IsPositive()
  @IsOptional()
  maxDownloadCount?: number;
}
