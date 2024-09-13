import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Id of the car',
    example: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'Description of the car',
    example: 'BMW',
  })
  description: string;

  @Column('int')
  @ApiProperty({
    description: 'Price of the car',
    example: 10000,
  })
  price: number;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  @ApiProperty({
    description: 'Images of the car',
    example: ['./car-images/7.jpg'],
  })
  images: string[];

  @Column()
  @ApiProperty({
    description: 'Type of the car',
    example: 'Sedan',
  })
  type: string;

  @Column('int')
  @ApiProperty({
    description: 'Year of the car',
    example: 2022,
  })
  year: number;

  @Column()
  @ApiProperty({
    description: 'Color of the car',
    example: 'White',
  })
  color: string;

  @Column()
  @ApiProperty({
    description: 'Fuel type of the car',
    example: 'Petrol',
  })
  fuelType: string;

  @Column('int')
  @ApiProperty({
    description: 'Distance of the car',
    example: 100,
  })
  distance: number;

  @Column('boolean')
  @ApiProperty({
    description: 'If the car is new',
    example: false,
  })
  isNew: boolean;

  @Column('jsonb')
  @ApiProperty({
    description: 'Location of the car',
    example: {
      city: 'Skopje',
      country: 'Macedonia',
    },
  })
  location: {
    city: string;
    country: string;
  };

  @Column()
  @ApiProperty({
    description: 'Brand of the car',
    example: 'BMW',
  })
  brand: string;

  @Column()
  @ApiProperty({
    description: 'Model of the car',
    example: 'X5',
  })
  model: string;

  @Column('int')
  @ApiProperty({
    description: 'Engine power of the car',
    example: 150,
  })
  enginePower: number;

  @Column('int')
  @ApiProperty({
    description: 'Number of doors of the car',
    example: 2,
  })
  doors: number;

  @Column('int')
  @ApiProperty({
    description: 'Number of seats of the car',
    example: 4,
  })
  seats: number;

  @Column()
  @ApiProperty({
    description: 'Transmission of the car',
    example: 'Manual',
  })
  transmission: string;

  @OneToOne(() => User, (user) => user.id)
  @ApiProperty({
    description: 'User who made the car',
    type: User,
  })
  seller: User;

  @Column({
    select: false,
  })
  sellerId: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Date when the car was created',
    example: '2023-01-01',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  @ApiPropertyOptional({
    description: 'Date when the car was last updated',
    example: '2023-01-01',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    nullable: true,
    select: false,
  })
  deletedAt: Date | null;
}
