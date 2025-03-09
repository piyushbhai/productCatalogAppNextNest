import { Controller, Get, Post, Body, Delete, Param, Query, HttpCode, UseGuards, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';
import { AuthGuard } from '../auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProduct(@Body() productData: CreateProductDto) {
    return this.productService.create(productData);
  }

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
    @Query('sort') sort?: string
  ) {
    return this.productService.filter(name, minPrice, maxPrice, sort);
  }
}
