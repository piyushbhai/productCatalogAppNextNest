import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Ensure ConfigService is available
  providers: [S3Service],
  exports: [S3Service], // Export to be used in other modules
})
export class S3Module {}
