import { IsNotEmpty, IsPositive, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsOptional()
  description?: string;
}
