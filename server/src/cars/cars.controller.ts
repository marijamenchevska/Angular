import { Roles } from '../common/decorators/roles.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  NotFoundException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Car } from './entities/car.entity';
import { Response } from '../common/types/response.interface';
import { GetUser } from '../common/decorators/current-user.decorator';
import { CurrentUser } from '../common/types/current-user.interface';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserRole } from '../common/types/user-role.enum';
import { RolesValidationType } from '../common/types/roles-validation-type.enum';
import { BackfillCarsDto } from './dto/backfill-cars.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new car',
    description: 'Creates a new car',
  })
  @ApiCreatedResponse({
    description: 'Returns the created car',
    type: Car,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Roles([UserRole.User, UserRole.Admin], RolesValidationType.HasSomeOfThese)
  create(@Body() createCarDto: CreateCarDto, @GetUser() user: CurrentUser) {
    return this.carsService.create(createCarDto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Find paginated cars by query params',
    description: 'Find paginated cars by query params',
  })
  @ApiOkResponse({
    description: 'Returns paginated cars',
  })
  findAll(@Query() queryCarDto: QueryCarDto): Promise<Response<Car[]>> {
    console.log(queryCarDto);

    return this.carsService.findAll(queryCarDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a car by id',
    description: 'Find a car by id',
  })
  @ApiOkResponse({
    description: 'Returns a car',
    type: Car,
  })
  @ApiNotFoundResponse({
    description: 'Car not found',
    type: NotFoundException,
  })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a car by id',
    description: 'Update a car by id',
  })
  @ApiOkResponse({
    description: 'Returns the updated car',
    type: Car,
  })
  @ApiNotFoundResponse({
    description: 'Car not found',
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input',
    type: BadRequestException,
  })
  @Roles([UserRole.User, UserRole.Admin], RolesValidationType.HasSomeOfThese)
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a car by id',
    description: 'Delete a car by id',
  })
  @ApiOkResponse({
    description: 'Returns void',
  })
  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }

  @Post('backfill')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Backfill cars',
    description: 'Backfill cars',
  })
  @ApiOkResponse({
    description: 'Returns created rooms',
    type: Car,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Roles([UserRole.Admin], RolesValidationType.HasAllOfThese)
  backfillRooms(@Query() query: BackfillCarsDto) {
    return this.carsService.backfillCars(query.count, query.userIds);
  }
}
