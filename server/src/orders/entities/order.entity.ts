import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id of the order',
    example: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

  @OneToOne(() => Car, (car) => car.id)
  @ApiProperty({
    description: 'Purchased car',
    type: Car,
  })
  @Type(() => Car)
  car: Car;

  @Column({
    select: false,
  })
  carId: string;

  @ApiProperty({
    description: 'User who made the order',
    type: User,
  })
  @Type(() => User)
  @OneToOne(() => User, (user) => user.id)
  buyer: User;

  @Column({
    select: false,
  })
  buyerId: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date when the order was created',
    example: '2023-01-01',
  })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @ApiPropertyOptional({
    description: 'Date when the order was updated',
    example: '2023-01-01',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt: Date | null;
}
