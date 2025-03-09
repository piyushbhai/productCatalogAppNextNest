import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE', eager: true })
  user: User;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', eager: true })
  product: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;
}
