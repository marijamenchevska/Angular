import { RouterModule } from '@angular/router';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Car } from '../types/cars.interface';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatIconModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent {
  // It might be undefined until the information arrives
  car = input<Car | undefined>();
}
