import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pako from 'pako';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Injectable()
export class UploadService {
  private readonly s3CLient = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3CLient.send(
      new PutObjectCommand({
        Bucket: 'frankme',
        Key: fileName,
        Body: file,
      }),
    );
  }

  async uploadCompressed(user: ActiveUserData, files: Express.Multer.File[]) {
    const fileBuffers = await Promise.all(
      files.map((file) => this.extractFileBuffer(file)),
    );

    const concatenatedBuffer = Buffer.concat(fileBuffers);

    const compressedBuffer = this.compressFile(concatenatedBuffer);
    const fileName = `${user.sub}-${Date.now()}.zip`;
    await this.upload(fileName, compressedBuffer);
    return { fileName: fileName };
  }

  private async extractFileBuffer(file: Express.Multer.File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      if (!file.buffer) {
        reject(new Error('File buffer is missing.'));
      } else {
        resolve(file.buffer);
      }
    });
  }

  private compressFile(file: Buffer): Buffer {
    return Buffer.from(pako.gzip(file));
  }
}
