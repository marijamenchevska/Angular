import { CarType } from './car-type.enum';
import { FuelType } from './fuel-type.enum';
import { TransmissionType } from './transmission-type.enum';

export interface SearchQuery {
  searchTerm?: string;
  priceFrom?: number;
  priceTo?: number;
  minYear?: number;
  type?: CarType;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  isNew?: boolean;
  doors?: number;
  seats?: number;
  page?: number;
  pageSize?: number;
}
