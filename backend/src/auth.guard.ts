import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
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
      const decoded = jwt.verify(token, 'SECRET_KEY'); // Use your actual secret key
      request.user = decoded; // Attach user to request
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
