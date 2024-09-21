import { CarType } from './car-type.enum';
import { FuelType } from './fuel-type.enum';

export interface Car {
  id: string;
  description: string;
  price: number;
  images: string[];
  type: CarType;
  year: number;
  color: string;
  fuelType: FuelType;
  distance: number;
  isNew: boolean;
  location: {
    city: string;
    country: string;
  };
  brand: string;
  model: string;
  enginePower: number;
  doors: number;
  seats: number;
  transmission: string;
}

export type CreateCar = Omit<Car, 'id'>;
