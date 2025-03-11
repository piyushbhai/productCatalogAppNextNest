import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly SECRET_KEY = '123123'; 

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        message: 'Token is missing',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY);

      request.user = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Invalid token',
        error: 'Unauthorized',
        statusCode: 401,
      });
    }
  }
}
