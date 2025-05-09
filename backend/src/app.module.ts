import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';
import { User } from './auth/user.entity';
import { CartItem } from './cart/cart-item.entity';

// import { Order } from './orders/order.entity';
// import { CartItem } from './cart/cart-item.entity';
// import { CartItem } from './upload/';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, CartItem], 
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
    }),
    TypeOrmModule.forFeature([Product, User]),
    ProductModule,
    OrderModule,
    AuthModule,
    CartModule,
  ],
})

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: 'admin',
//       database: 'product_catalog',
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     TypeOrmModule.forFeature([Product, User]),
//     ProductModule,
//     AuthModule,
//   ],
// })
export class AppModule {}
