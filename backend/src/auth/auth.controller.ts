import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
