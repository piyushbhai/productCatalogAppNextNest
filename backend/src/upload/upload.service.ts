import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  getMulterOptions() {
    return {
      storage: multerS3({
        s3: this.s3,
        bucket: this.configService.get<string>('AWS_S3_BUCKET'),
        acl: 'public-read', // Makes files publicly accessible
        key: (req, file, cb) => {
          const filename = `uploads/${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image uploads are allowed'), false);
        }
        cb(null, true);
      },
    };
  }
}
