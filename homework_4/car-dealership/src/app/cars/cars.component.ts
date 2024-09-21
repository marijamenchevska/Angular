import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CarComponent } from '../car/car.component';
import { Car } from '../types/cars.interface';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [MatGridListModule, CarComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent {
  cars = input<Car[]>([]);
}
