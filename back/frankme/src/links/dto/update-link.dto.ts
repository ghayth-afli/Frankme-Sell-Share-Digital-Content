import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateLinkDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsOptional()
  @IsPositive()
  price: number;
  @IsOptional()
  @IsString()
  expirationDate: string;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @IsPositive()
  maxDownloadCount: number;
  @IsOptional()
  @IsPositive()
  numberOfCLicks: number;
  @IsOptional()
  @IsPositive()
  numberOfDownload: number;
}
