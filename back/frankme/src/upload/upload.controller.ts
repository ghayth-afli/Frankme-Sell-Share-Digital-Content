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
import { ActiveUser } from 'src/iam/authentication/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@UseGuards(AccessTokenGuard)
@Auth(AuthType.Bearer)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @ActiveUser() user: ActiveUserData,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100000000,
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    try {
      const result = await this.uploadService.uploadCompressed(user, files);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error while compressing ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
