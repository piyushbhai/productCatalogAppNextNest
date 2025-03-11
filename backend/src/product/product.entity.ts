import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  stock: number; // ✅ Now allows zero

  @Column({ nullable: true })
  description?: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}


// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
// import { IsNotEmpty, IsPositive, IsOptional, Min } from 'class-validator';

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   @IsNotEmpty()
//   name: string;

//   @Column('float')
//   @IsPositive()
//   price: number;

//   @Column()
//   @IsPositive()
//   @Min(0, { message: 'Stock must be zero or higher' })
//   stock: number;

//   @Column({ nullable: true })
//   @IsOptional()
//   description?: string;

//   @Column('text', { array: true, default: [] })
//   images: string[];

//   @CreateDateColumn({ type: 'timestamp' })
//   createdAt: Date;
// }
