import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class CarLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'City of the car',
    example: 'Skopje',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Country of the car',
    example: 'Macedonia',
  })
  country: string;
}

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the car',
    example: 'BMW X5 kako novo...',
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Price of the car',
    example: 10000,
  })
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Images of the car',
    example: ['./car-images/1.jpg'],
  })
  images: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Type of the car',
    example: 'Sedan',
  })
  type: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1900)
  @ApiProperty({
    description: 'Year of the car',
    example: 2022,
  })
  year: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Color of the car',
    example: 'White',
  })
  color: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Fuel type of the car',
    example: 'Petrol',
  })
  fuelType: string;

  @IsInt()
  @Min(1)
  @Max(2000000)
  @ApiProperty({
    description: 'Distance of the car',
    example: 100,
  })
  distance: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'If the car is new',
    example: false,
  })
  isNew: boolean;

  @Type(() => CarLocationDto)
  @ValidateNested()
  @ApiProperty({
    description: 'Location of the car',
    type: CarLocationDto,
  })
  location: CarLocationDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Brand of the car',
    example: 'BMW',
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Model of the car',
    example: 'X5',
  })
  model: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Engine power of the car',
    example: 150,
  })
  enginePower: number;

  @IsInt()
  @Min(1)
  @Max(12)
  @ApiProperty({
    description: 'Number of doors of the car',
    example: 2,
  })
  doors: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  @ApiProperty({
    description: 'Number of seats of the car',
    example: 4,
  })
  seats: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Transmission of the car',
    example: 'Manual',
  })
  transmission: string;
}
