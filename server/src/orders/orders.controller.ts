import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { GetUser } from '../common/decorators/current-user.decorator';
import { CurrentUser } from '../common/types/current-user.interface';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description: 'Creates a new order',
  })
  @ApiCreatedResponse({
    description: 'Returns the created order',
    type: Order,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: CurrentUser) {
    return this.ordersService.create(createOrderDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all orders',
    description: 'Find all orders',
  })
  @ApiOkResponse({
    description: 'Returns an array of orders',
    type: Order,
    isArray: true,
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a order by id',
    description: 'Find a order by id',
  })
  @ApiOkResponse({
    description: 'Returns a order',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
    type: NotFoundException,
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a order by id',
    description: 'Update a order by id',
  })
  @ApiOkResponse({
    description: 'Returns the updated order',
    type: Order,
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a order by id',
    description: 'Delete a order by id',
  })
  @ApiOkResponse({
    description: 'Returns void',
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
