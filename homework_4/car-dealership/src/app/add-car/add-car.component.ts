import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { CarType } from '../types/car-type.enum';
import { CreateCar } from '../types/cars.interface';
import { FuelType } from '../types/fuel-type.enum';
import { TransmissionType } from '../types/transmission-type.enum';
import { newCarDistanceValidator } from '../validators/new-car-distance.validator';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css',
})
export class AddCarComponent {
  readonly carType = Object.values(CarType);
  readonly fuelType = Object.values(FuelType).filter(
    (fuel) => fuel !== FuelType.All
  );
  readonly transmissionType = Object.values(TransmissionType).filter(
    (transmission) => transmission !== TransmissionType.All
  );
  readonly carCondition = ['New', 'Used'];
  readonly currentYear = new Date().getFullYear();

  constructor(
    private carsService: CarsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  carForm = new FormGroup(
    {
      brand: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      model: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000000),
      ]),
      year: new FormControl('', [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.currentYear),
      ]),
      type: new FormControl('', Validators.required),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      isNew: new FormControl('', Validators.required),
      distance: new FormControl('', [Validators.required, Validators.min(0)]),
      color: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[A-Za-z]+'),
      ]),
      fuelType: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required),
      enginePower: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(2000),
      ]),
      doors: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(7),
      ]),
      seats: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(9),
        Validators.pattern('[2456789]'),
      ]),
    },
    { validators: newCarDistanceValidator }
  );

  get brandErrors() {
    const brandControl = this.carForm.get('brand');

    if (brandControl?.hasError('required')) return 'Brand is required.';
    if (brandControl?.hasError('minlength'))
      return 'Brand must have at least 3 characters.';

    return '';
  }

  get modelErrors() {
    const modelControl = this.carForm.get('model');

    if (modelControl?.hasError('required')) return 'Model is required.';
    if (modelControl?.hasError('minlength'))
      return 'Model must have at least 2 characters.';

    return '';
  }

  get descriptionErrors() {
    const descriptionControl = this.carForm.get('description');

    if (descriptionControl?.hasError('required'))
      return 'Description is required.';
    if (descriptionControl?.hasError('minlength'))
      return 'Description must have at least 20 characters.';
    if (descriptionControl?.hasError('maxlength'))
      return 'Description must have 100 characters at most.';

    return '';
  }

  get priceErrors() {
    const priceControl = this.carForm.get('price');

    if (priceControl?.hasError('required')) return 'Price is required.';
    if (priceControl?.hasError('min')) return 'Price must be at least $1.';
    if (priceControl?.hasError('max'))
      return 'Price must be $1000000000 at most.';

    return '';
  }

  get yearErrors() {
    const yearControl = this.carForm.get('year');

    if (yearControl?.hasError('required')) return 'Year is required.';
    if (yearControl?.hasError('min')) return 'Year must be at least 1990.';
    if (yearControl?.hasError('max'))
      return `Year can't be more than the current year.`;

    return '';
  }

  get typeErrors() {
    const typeControl = this.carForm.get('type');

    if (typeControl?.hasError('required')) return 'Type is required.';

    return '';
  }

  get cityErrors() {
    const cityControl = this.carForm.get('city');

    if (cityControl?.hasError('required')) return 'City is required.';
    if (cityControl?.hasError('minlength'))
      return 'City must have at least 2 characters.';
    if (cityControl?.hasError('pattern'))
      return 'City must contain only letters.';

    return '';
  }

  get countryErrors() {
    const countryControl = this.carForm.get('country');

    if (countryControl?.hasError('required')) return 'Country is required.';
    if (countryControl?.hasError('minlength'))
      return 'Country must have at least 4 characters.';
    if (countryControl?.hasError('pattern'))
      return 'Country must contain only letters.';

    return '';
  }

  get conditionError() {
    const conditionControl = this.carForm.get('isNew');

    if (conditionControl?.hasError('required')) return 'Condition is required.';

    return '';
  }

  get distanceError() {
    const distanceControl = this.carForm.get('distance');

    if (distanceControl?.hasError('required')) return 'Distance is required.';
    if (distanceControl?.hasError('min'))
      return 'Distance must be at least 0 km.';

    return '';
  }

  get colorError() {
    const colorControl = this.carForm.get('color');

    if (colorControl?.hasError('required')) return 'Color is required.';
    if (colorControl?.hasError('minlength'))
      return 'Color must have at least 3 characters.';
    if (colorControl?.hasError('pattern'))
      return 'Color must contain only letters.';

    return '';
  }

  get fuelError() {
    const fuelControl = this.carForm.get('fuelType');

    if (fuelControl?.hasError('required')) return 'Fuel is required.';

    return '';
  }

  get transmissionError() {
    const transmissionControl = this.carForm.get('transmission');

    if (transmissionControl?.hasError('required'))
      return 'Transmission is required.';

    return '';
  }

  get enginePowerErrors() {
    const enginePowerControl = this.carForm.get('enginePower');

    if (enginePowerControl?.hasError('required'))
      return 'Engine power is required.';
    if (enginePowerControl?.hasError('min'))
      return 'Engine power must be at least 0 hp.';
    if (enginePowerControl?.hasError('max'))
      return 'Engine power must be 2000 hp at most.';

    return '';
  }

  get doorsErrors() {
    const doorsControl = this.carForm.get('doors');

    if (doorsControl?.hasError('required')) return 'Door number is required.';
    if (doorsControl?.hasError('min')) return 'Door number must be at least 2.';
    if (doorsControl?.hasError('max')) return 'Door number must be 7 at most.';

    return '';
  }

  get seatsErrors() {
    const seatsControl = this.carForm.get('seats');

    if (seatsControl?.hasError('required')) return 'Door number is required.';
    if (seatsControl?.hasError('min'))
      return 'Seats number must be at least 2.';
    if (seatsControl?.hasError('max')) return 'Seat number must be 9 at most.';
    if (seatsControl?.hasError('pattern'))
      return 'A car can have 2, 4, 5, 6, 7, 8 or 9 seats.';

    return '';
  }

  get formError() {
    // console.log(this.carForm?.hasError('newCar'));

    return this.carForm?.hasError('newCar')
      ? 'New cars must have 0 distance.'
      : '';
  }

  onSubmit() {
    this.carForm.markAllAsTouched();

    if (this.carForm.invalid) return;

    const carBody: CreateCar = {
      brand: this.carForm.value.brand!,
      model: this.carForm.value.model!,
      description: this.carForm.value.description!,
      price: Number(this.carForm.value.price),
      year: Number(this.carForm.value.year),
      location: {
        city: this.carForm.value.city!,
        country: this.carForm.value.country!,
      },
      type: this.carForm.value.type as CarType,
      isNew: this.carForm.value.isNew === 'New' ? true : false,
      color: this.carForm.value.type!,
      fuelType: this.carForm.value.fuelType as FuelType,
      distance: Number(this.carForm.value.distance),
      enginePower: Number(this.carForm.value.enginePower),
      transmission: this.carForm.value.transmission as TransmissionType,
      doors: Number(this.carForm.value.doors),
      seats: Number(this.carForm.value.seats),
      images: [''],
    };

    this.carsService.createCar(carBody).subscribe();

    this.snackBar.open('Car has been successfully added!', '', {
      panelClass: `snackbar`,
      duration: 5000,
    });

    this.router.navigate(['']);
  }
}
