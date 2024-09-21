import { NotFoundComponent } from './../not-found/not-found.component';
import { SearchQuery } from './../types/search-query.interface';
import { Component, OnInit, effect, signal } from '@angular/core';
import { Observable, debounceTime, finalize, map, tap } from 'rxjs';
import { CarsComponent } from '../cars/cars.component';
import { FiltersComponent } from '../filters/filters.component';
import { CarsService } from '../services/cars.service';
import { CarCondition } from '../types/car-condition.enum';
import { CarType } from '../types/car-type.enum';
import { FuelType } from '../types/fuel-type.enum';
import { Response } from '../types/response.interface';
import { TransmissionType } from '../types/transmission-type.enum';
import { Car } from './../types/cars.interface';
import { AsyncPipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarsComponent,
    FiltersComponent,
    NotFoundComponent,
    LoaderComponent,
    AsyncPipe,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loader = signal<boolean>(false);
  cars$: Observable<Car[]> = new Observable();
  total = signal<number>(0);
  page = signal<number>(0);
  pageSize = signal<number>(10);
  searchWord = signal<string>('');
  priceFrom = signal<number>(140000);
  priceTo = signal<number>(3500000);
  year = signal<number | undefined>(undefined);
  carType = signal<CarType | undefined>(undefined);
  fuelType = signal<FuelType>(FuelType.All);
  transmissionType = signal<TransmissionType>(TransmissionType.All);
  carCondition = signal<CarCondition>(CarCondition.All);
  doors = signal<number | undefined>(undefined);
  seats = signal<number | undefined>(undefined);
  // The doors and seats input returns number | null, but because they are optional properties in the QueryCarDto, there they're considered as number | undefined, which means doors and seats must be number | undefined
  // However, then the home template gives error when setting the signals with $event, which is why $any is used there

  constructor(private carsService: CarsService) {
    effect(
      () => {
        const searchQuery: SearchQuery = {
          // These are always sent as query params
          page: this.page(),
          pageSize: this.pageSize(),
          priceFrom: this.priceFrom(),
          priceTo: this.priceTo(),
        };

        if (this.searchWord()) searchQuery.searchTerm = this.searchWord();

        if (this.year()) searchQuery.minYear = this.year();

        if (this.carType()) searchQuery.type = this.carType();

        if (this.fuelType() !== FuelType.All)
          searchQuery.fuelType = this.fuelType();

        if (this.transmissionType() !== TransmissionType.All)
          searchQuery.transmission = this.transmissionType();

        if (this.carCondition() !== CarCondition.All)
          searchQuery.isNew = this.carCondition() === 'New' ? true : false;

        if (this.doors()) searchQuery.doors = this.doors();

        if (this.seats()) searchQuery.seats = this.seats();

        this.getCars(searchQuery);
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(searchQuery?: SearchQuery) {
    this.loader.set(true);
    // setTimeout(
    //   () =>
    //     (this.cars$ = this.carsService.getCars(searchQuery).pipe(
    //       tap((res: Response<Car[]>) => this.total.set(res.total)),
    //       map((res: Response<Car[]>) => res.payload),
    //       finalize(() => this.loader.set(false))
    //     )),
    //   5500
    // );

    this.cars$ = this.carsService.getCars(searchQuery).pipe(
      tap((res: Response<Car[]>) => this.total.set(res.total)),
      map((res: Response<Car[]>) => res.payload),
      finalize(() => this.loader.set(false))
    );
  }
}
