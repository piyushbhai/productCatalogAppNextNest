import { Controller, Post, Get, Req, UseGuards, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Req() req, @Body() cartItems: any[]) {
    return this.orderService.createOrder(req.user.id, cartItems);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUserOrders(@Req() req) {
    return this.orderService.getUserOrders(req.user.id);
  }
}
