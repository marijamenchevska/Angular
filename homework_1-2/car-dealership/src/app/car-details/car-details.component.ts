import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { CarsService } from './../services/cars.service';
import { Car } from './../types/cars.interface';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [MatIconModule, NotFoundComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css',
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  // Can't use input signals here because we're not sending a car object from a parent component, i.e. the car details page is an independent page
  car$: Observable<Car | undefined> = new Observable();

  // Even though the template could use the data from car$ with the async pipe, the data is needed here as well - to set up the title of this page - which is why subscription + car property is used, to avoid having subscription + async pipe in the template (not sure if it's good practice)
  car: Car | undefined = undefined;
  subscription = new Subscription();

  largeCarImage = signal<string>('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private carsService: CarsService,
    private title: Title
  ) {}

  ngOnInit(): void {
    // This observable can't be predefined in the service because it's not known beforehand, it's known only after the route parameter has been extracted
    this.car$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.carsService.getCar(params['id']))
    );

    this.subscription = this.car$.subscribe((car: Car | undefined) => {
      this.car = car;

      if (car) {
        this.title.setTitle(`${car.brand} ${car.model}`);
        this.largeCarImage.set(car.images[0]);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
