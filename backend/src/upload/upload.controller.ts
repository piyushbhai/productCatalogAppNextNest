import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterS3File } from 'multer-s3';  // ✅ Import correct type

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterS3File) {  // ✅ Use correct type
    if (!file) {
      throw new BadRequestException('File upload failed');
    }
    return { url: file.location };
  }
}
