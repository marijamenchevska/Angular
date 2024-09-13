import { faker } from '@faker-js/faker';
import { CreateCarDto } from '../../cars/dto/create-car.dto';

export default function generateFakeCars(
  userIds: string[],
  count: number = 50,
) {
  const cars: (CreateCarDto & { sellerId: string })[] = [];

  for (let i = 0; i < count; i++) {
    cars.push({
      sellerId: faker.helpers.arrayElement(userIds),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 300, max: 3500000 }),
      images: faker.helpers.arrayElements(
        [
          `./car-images/${faker.number.int({ min: 1, max: 30 })}.jpg`,
          `./car-images/${faker.number.int({ min: 1, max: 30 })}.jpg`,
          `./car-images/${faker.number.int({ min: 1, max: 30 })}.jpg`,
          `./car-images/${faker.number.int({ min: 1, max: 30 })}.jpg`,
          `./car-images/${faker.number.int({ min: 1, max: 30 })}.jpg`,
        ],
        {
          min: 1,
          max: 5,
        },
      ),
      type: faker.helpers.arrayElement([
        'Sedan',
        'SUV',
        'Coupe',
        'Hatchback',
        'Convertible',
        'Minivan',
        'Van',
        'Crossover',
        'Wagon',
      ]),
      year: faker.date.past().getFullYear(),
      color: faker.color.human(),
      fuelType: faker.helpers.arrayElement([
        'Petrol',
        'Diesel',
        'Electric',
        'Hybrid',
      ]),
      distance: faker.number.int({ min: 1, max: 2000000 }),
      isNew: faker.datatype.boolean(),
      location: {
        city: faker.location.city(),
        country: faker.location.country(),
      },
      brand: faker.helpers.arrayElement([
        'BMW',
        'Mercedes',
        'Audi',
        'Volkswagen',
        'Porsche',
        'Bentley',
        'Lamborghini',
        'Aston Martin',
        'Lexus',
        'Zastava',
        'Bugatti',
        'Renault',
        'Jaguar',
        'Land Rover',
        'Dodge',
        'Chevrolet',
        'Ford',
        'Toyota',
        'Honda',
        'Mazda',
        'Nissan',
        'Subaru',
      ]),
      model: faker.helpers.arrayElement([
        'X5',
        'X7',
        'S8',
        'S2000',
        'S3000',
        'S4000',
        'R8',
        'R10',
        'R12',
        'R8',
        'Q5',
        'Q7',
        'Q8',
        'Q50',
        'Q60',
        'Q70',
        'Q80',
        'Q90',
      ]),
      enginePower: faker.number.int({ min: 1, max: 2000 }),
      doors: faker.number.int({ min: 1, max: 5 }),
      seats: faker.number.int({ min: 1, max: 7 }),
      transmission: faker.helpers.arrayElement([
        'Manual',
        'Automatic',
        'Semi-Automatic',
      ]),
    });
  }

  return cars;
}
