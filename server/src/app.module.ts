import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Car } from './cars/entities/car.entity';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Car, Order]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '1h' },
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [
    UsersController,
    AuthController,
    CarsController,
    OrdersController,
  ],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    CarsService,
    OrdersService,
  ],
  exports: [],
})
export class AppModule {}
