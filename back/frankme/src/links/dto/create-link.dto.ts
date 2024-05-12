import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateFileDto } from './create-file.dto';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  title: string;
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
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  files: CreateFileDto[];
}
