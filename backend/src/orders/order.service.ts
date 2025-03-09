import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity';
import { User } from '../auth/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async createOrder(userId: number, cartItems: any[]): Promise<{ message: string; statusCode: number; data?: Order }> {
    // ✅ Check if cartItems is actually an array
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new BadRequestException({
        message: 'Cart is empty or invalid',
        error: 'Bad Request',
        statusCode: 400,
      });
    }

    // ✅ Check if user exists
    const user = await this.userRepo.findOne({ where: { id: Number(userId) } });
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      });
    }

    // ✅ Create a new order
    const order = this.orderRepo.create({ user, status: 'pending', totalPrice: 0 });
    const savedOrder = await this.orderRepo.save(order);

    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    // ✅ Loop through the cartItems and add products
    for (const item of cartItems) {
      const product = await this.productRepo.findOne({ where: { id: item.productId } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      // ✅ Create OrderItem
      const orderItem = this.orderItemRepo.create({
        order: savedOrder,
        product: product,
        quantity: item.quantity,
        price: product.price * item.quantity,
      });

      // ✅ Add it to the orderItems array
      orderItems.push(orderItem);
      totalPrice += product.price * item.quantity;
    }

    // ✅ Save all order items
    await this.orderItemRepo.save(orderItems);

    // ✅ Update order total price
    savedOrder.totalPrice = totalPrice;
    await this.orderRepo.save(savedOrder);

    // ✅ Return response
    return {
      message: 'Order placed successfully',
      statusCode: 201,
      data: savedOrder,
    };
  }

  // ✅ Get user orders
  async getUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}
