import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  // ✅ Add to cart or update if already exists
  async addToCart(userId: number, productId: number, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    // Find User and Product
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const product = await this.productRepo.findOne({ where: { id: productId } });

    if (!user) throw new NotFoundException('User not found');
    if (!product) throw new NotFoundException('Product not found');

    // Check if item already exists in cart
    const existingItem = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepo.save(existingItem);
    }

    // Add a new cart item
    const cartItem = this.cartRepo.create({
      user,
      product,
      quantity,
    });

    return this.cartRepo.save(cartItem);
  }

  // ✅ Get cart items for user
  async getCartItems(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  // ✅ Update cart item quantity
  async updateCartItem(cartId: number, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be at least 1');
    }

    const cartItem = await this.cartRepo.findOne({ where: { id: cartId } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    cartItem.quantity = quantity;
    return this.cartRepo.save(cartItem);
  }

  // ✅ Remove single item from cart
  async removeCartItem(cartId: number) {
    const cartItem = await this.cartRepo.findOne({ where: { id: cartId } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    return this.cartRepo.delete(cartId);
  }

  // ✅ Clear entire cart
  async clearCart(userId: number) {
    return this.cartRepo.delete({ user: { id: userId } });
  }
}
