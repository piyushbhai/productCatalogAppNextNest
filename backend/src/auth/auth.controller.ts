import { Controller, Post, Get, Body, UsePipes, ValidationPipe,Req, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async signup(@Body() body: UserDto) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('users/:id')
  // @UseGuards(AuthGuard)  
  async getUserOrders(@Param('id') id: string) {
    const user = await this.authService.getUserByID(parseInt(id));
    return {
      user: user
    };
  }

}
