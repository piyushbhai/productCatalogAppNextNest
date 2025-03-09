import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { CartItem } from '../cart/cart-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Ensure this is not nullable
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, { cascade: true })
  cart: CartItem[];
}
