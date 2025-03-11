import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  private readonly SECRET_KEY = '123123'; 

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async signup(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({ name, email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async login(email: string, password: string): Promise<{ token: string,id:number }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id }, 
      this.SECRET_KEY, 
      { expiresIn: '1h' } 
    );

    return { token,id:user.id };
  }

  async getUserByID(userId: number): Promise<User[]> {
    const data = await this.userRepo.find({where: { id: userId } });  
      return data
  }
}
