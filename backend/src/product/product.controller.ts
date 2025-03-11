import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  HttpCode,
  UseGuards,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';
import { AuthGuard } from '../auth.guard';
import { S3Service } from '../s3/s3.service'; // Ensure correct import
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  async getProducts(): Promise<{ products: Product[] }> {
    const products = await this.productService.findAll();
    return { products };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images', 5))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProduct(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price', ParseIntPipe) price: number,  // ✅ Converts string to number
    @Body('stock', ParseIntPipe) stock: number,  // ✅ Converts string to number
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const uploadedImageUrls = await Promise.all(files.map((file) => this.s3Service.uploadFile(file)));

    return this.productService.create({ name, description, price, stock, images: uploadedImageUrls });
  }
  // async createProduct(
  //   @Body() productData: CreateProductDto,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body('price', ParseIntPipe) price: number,  // ✅ Converts string to number
  //   @Body('stock', ParseIntPipe) stock: number,  // ✅ Converts string to number
  // ) {
  //   const uploadedImageUrls = await Promise.all(
  //     files.map((file) => this.s3Service.uploadFile(file)),
  //   );

  //   return this.productService.create({ ...productData, images: uploadedImageUrls });
  // }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Get('filter')
  filter(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sort') sort?: string,
  ) {
    return this.productService.filter(name, minPrice, maxPrice, sort);
  }
}
