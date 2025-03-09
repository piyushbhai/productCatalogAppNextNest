import { Controller, Post, Get, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './cart.dto';
import { AuthGuard } from '../auth.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async addToCart(@Request() req, @Body() body: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, body.productId, body.quantity);
  }

  @Get()
  async getCart(@Request() req) {
    return this.cartService.getCartItems(req.user.id);
  }

  @Put(':id')
  async updateCart(@Param('id') id: number, @Body() body: UpdateCartDto) {
    return this.cartService.updateCartItem(id, body.quantity);
  }

  @Delete(':id')
  async removeCartItem(@Param('id') id: number) {
    return this.cartService.removeCartItem(id);
  }

  @Delete('/clear')
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
