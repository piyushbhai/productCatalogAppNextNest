import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { S3Module } from '../s3/s3.module'; // Import S3Module

@Module({
  imports: [TypeOrmModule.forFeature([Product]), S3Module], // Ensure S3Module is imported
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
