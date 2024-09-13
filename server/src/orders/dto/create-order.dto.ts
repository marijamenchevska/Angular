import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Id of the car the order is for',
    example: '00000000-0000-0000-0000-000000000000',
  })
  carId: string;
}
