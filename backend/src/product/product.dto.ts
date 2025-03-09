import { IsNotEmpty, IsPositive, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsPositive()
  @Min(0, { message: 'Stock must be zero or higher' })
  stock: number;

  @IsOptional()
  description?: string;
}
