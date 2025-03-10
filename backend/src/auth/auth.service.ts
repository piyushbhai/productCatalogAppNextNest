import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly SECRET_KEY = '123123';  // ✅ Fixed Hard-coded Secret Key

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  // ✅ Signup Method (100% Fixed)
  async signup(name: string, email: string, password: string): Promise<User> {
    // Check if the email already exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save User to Database
    const user = this.userRepo.create({ name, email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  // ✅ Login Method (100% Fixed)
  async login(email: string, password: string): Promise<{ token: string,id:number }> {
    // ✅ Check if the user exists
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user.id },      // ✅ Payload (User ID)
      this.SECRET_KEY,      // ✅ Hard-coded Secret Key
      { expiresIn: '1h' }   // ✅ Token Expiry (1 Hour)
    );

    return { token,id:user.id };
  }
}
