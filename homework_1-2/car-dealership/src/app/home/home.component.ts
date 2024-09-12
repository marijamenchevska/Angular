import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { CarsComponent } from '../cars/cars.component';
import { FiltersComponent } from '../filters/filters.component';
import { CarsService } from '../services/cars.service';
import { CarCondition } from '../types/car-condition.enum';
import { CarType } from '../types/car-type.enum';
import { FuelType } from '../types/fuel-type.enum';
import { TransmissionType } from '../types/transmission-type.enum';
import { Car } from './../types/cars.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarsComponent, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  cars = signal<Car[]>([]);
  searchWord = signal<string>('');
  priceFrom = signal<number>(2000);
  priceTo = signal<number>(500000);
  year = signal<number | undefined>(undefined);
  carType = signal<CarType | undefined>(undefined);
  fuelType = signal<FuelType>(FuelType.All);
  transmissionType = signal<TransmissionType>(TransmissionType.All);
  carCondition = signal<CarCondition>(CarCondition.All);
  doors = signal<number | null>(null);
  seats = signal<number | null>(null);

  constructor(private carsService: CarsService) {}

  filteredCars = computed<Car[]>(() => {
    let filteredCars: Car[] = this.cars();

    // No need for a condition here, because the fetched cars will always be filtered according to the slider values, i.e. those values can't be invalid (eg. < 0)
    filteredCars = filteredCars.filter(
      (car) => this.priceFrom() <= car.price && car.price <= this.priceTo()
    );

    if (this.searchWord())
      filteredCars = filteredCars.filter(
        (car) =>
          car.brand.toLowerCase().includes(this.searchWord().toLowerCase()) ||
          car.model.toLowerCase().includes(this.searchWord().toLowerCase())
      );

    if (this.year())
      filteredCars = filteredCars.filter((car) => car.year === this.year());

    if (this.carType())
      filteredCars = filteredCars.filter((car) => car.type === this.carType());

    if (this.fuelType() !== FuelType.All)
      filteredCars = filteredCars.filter(
        (car) => car.fuelType === this.fuelType()
      );

    if (this.transmissionType() !== TransmissionType.All)
      filteredCars = filteredCars.filter(
        (car) => car.transmission === this.transmissionType()
      );

    if (this.carCondition() !== CarCondition.All)
      this.carCondition() === 'New'
        ? (filteredCars = filteredCars.filter((car) => car.isNew === true))
        : (filteredCars = filteredCars.filter((car) => car.isNew === false));

    if (this.doors())
      filteredCars = filteredCars.filter((car) => car.doors === this.doors());

    if (this.seats())
      filteredCars = filteredCars.filter((car) => car.seats === this.seats());

    return filteredCars;
  });

  ngOnInit(): void {
    this.subscription = this.carsService.cars.subscribe((cars: Car[]) =>
      this.cars.set(cars)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
