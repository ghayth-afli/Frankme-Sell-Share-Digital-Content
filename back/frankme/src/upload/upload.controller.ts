import {
  Controller,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { AccessTokenGuard } from 'src/iam/authentication/guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@Auth(AuthType.Bearer)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    for (const file of files) {
      try {
        await this.uploadService.upload(file.originalname, file.buffer);
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Unable to upload files',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
