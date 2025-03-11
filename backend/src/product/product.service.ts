import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ order: { createdAt: 'DESC' } });
  }

  // async create(productData: Partial<Product>): Promise<{ message: string; statusCode: number; data?: Product }> {
  //   if (!productData.name || !productData.price) {
  //     throw new BadRequestException('Name and price are required');
  //   }

  //   const product = this.productRepository.create(productData);
  //   const savedProduct = await this.productRepository.save(product);

  //   return {
  //     message: 'Product created successfully',
  //     statusCode: 201,
  //     data: savedProduct,
  //   };
  // }
  async create(productData: Partial<Product>): Promise<{ message: string; statusCode: number; data?: Product }> {
    if (!productData.name || !productData.price) {
      throw new BadRequestException('Name and price are required');
    }
  
    const product = this.productRepository.create({
      ...productData,
      images: productData.images || [],
    });
  
    const savedProduct = await this.productRepository.save(product);
  
    return {
      message: 'Product created successfully',
      statusCode: 201,
      data: savedProduct,
    };
  }

  async delete(id: number): Promise<{ message: string; statusCode: number }> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }

    return { message: 'Product deleted successfully', statusCode: 200 };
  }

  async filter(
    name?: string,
    minPrice?: number,
    maxPrice?: number,
    sort?: string
  ) {
    const query = this.productRepository.createQueryBuilder('product');

    if (name) {
      query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    const sortOrder = sort?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    query.orderBy('product.price', sortOrder);

    return query.getMany();
  }
}
