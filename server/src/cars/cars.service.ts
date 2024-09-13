import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { QueryCarDto } from './dto/query-car.dto';
import { CurrentUser } from '../common/types/current-user.interface';
import generateFakeCars from '../common/fakers/generate-fake-cars.helper';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createCarDto: CreateCarDto, user: CurrentUser) {
    return this.carRepository.save({
      ...createCarDto,
      sellerId: user.userId,
    });
  }

  async findAll(queryCarDto: QueryCarDto) {
    const {
      searchTerm,
      brand,
      model,
      type,
      priceFrom,
      priceTo,
      minYear,
      maxDistance,
      minEnginePower,
      transmission,
      fuelType,
      isNew,
      doors,
      seats,
      page,
      pageSize,
      sortBy,
      sortDirection,
    } = queryCarDto;

    const query = this.carRepository.createQueryBuilder('cars');

    query.andWhere('cars.price >= :priceFrom AND cars.price <= :priceTo', {
      priceFrom,
      priceTo,
    });

    if (searchTerm) {
      query.andWhere(
        'cars.description ILIKE :searchTerm OR cars.model ILIKE :searchTerm OR cars.brand ILIKE :searchTerm',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    if (brand) {
      query.andWhere('cars.brand = :brand', { brand });
    }

    if (model) {
      query.andWhere('cars.model = :model', { model });
    }

    if (type) {
      query.andWhere('cars.type = :type', { type });
    }

    if (minYear) {
      query.andWhere('cars.year >= :minYear', { minYear });
    }

    if (maxDistance) {
      query.andWhere('cars.distance <= :maxDistance', { maxDistance });
    }

    if (minEnginePower) {
      query.andWhere('cars.enginePower >= :minEnginePower', {
        minEnginePower,
      });
    }

    if (transmission) {
      query.andWhere('cars.transmission = :transmission', {
        transmission,
      });
    }

    if (fuelType) {
      query.andWhere('cars.fuelType = :fuelType', { fuelType });
    }

    if (typeof isNew === 'boolean') {
      query.andWhere('cars.isNew = :isNew', { isNew });
    }

    if (doors) {
      query.andWhere('cars.doors = :doors', { doors });
    }

    if (seats) {
      query.andWhere('cars.seats = :seats', { seats });
    }

    const [cars, total] = await query
      .orderBy(`cars.${sortBy}`, sortDirection)
      .take(pageSize)
      .skip(pageSize * page)
      .getManyAndCount();

    return { payload: cars, total };
  }

  findOne(id: string) {
    try {
      return this.carRepository.findOneByOrFail({ id });
    } catch (error) {
      console.error('Error finding car', error);
      throw new NotFoundException(`Car with id ${id} not found`);
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    await this.findOne(id);

    try {
      await this.carRepository.update(id, updateCarDto);
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error while updating car');
    }
  }

  async remove(id: string) {
    await this.carRepository.softDelete(id);
  }

  async backfillCars(count: number = 50, userIds: string[] = []) {
    // run clean up
    this.carRepository.delete({});

    if (!userIds.length) {
      const users = await this.userRepository.find();

      if (!users.length) {
        throw new BadRequestException(
          'No users found. You must have at least one user to backfill cars as each car must have a sellerId',
        );
      }

      userIds = users.map((user) => user.id);
    }

    // insert new data
    this.carRepository.insert(generateFakeCars(userIds, count));
  }
}
