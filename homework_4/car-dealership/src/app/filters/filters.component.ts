import {
  AfterViewInit,
  Component,
  OnInit,
  input,
  output,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CarType } from '../types/car-type.enum';
import { FuelType } from '../types/fuel-type.enum';
import { TransmissionType } from '../types/transmission-type.enum';
import { CarCondition } from '../types/car-condition.enum';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import {
  Subscription,
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
} from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatIconModule,
    MatSliderModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, AfterViewInit, OnDestroy {
  // ! tells Typescript that searchInput will definitely be "available/present" after the view has been initialized, where this element will be referenced
  @ViewChild('searchInput') searchInput!: ElementRef;
  subscription: Subscription = new Subscription();

  readonly yearSelection: number[] = [];
  readonly carTypes = Object.values(CarType);
  readonly fuelTypes = Object.values(FuelType);
  readonly transmissionTypes = Object.values(TransmissionType);
  readonly carConditions = Object.values(CarCondition);

  searchWord = input<string>();
  onSearchWordChange = output<string>();

  priceFrom = input<number>();
  onPriceFromChange = output<number>();

  priceTo = input<number>();
  onPriceToChange = output<number>();

  year = input<number | undefined>();
  onYearChange = output<number | undefined>();

  carType = input<CarType | undefined>();
  onCarTypeChange = output<CarType | undefined>();

  fuelType = input<FuelType>();
  onFuelTypeChange = output<FuelType>();

  transmissionType = input<TransmissionType>();
  onTransmissionTypeChange = output<TransmissionType>();

  carCondition = input<CarCondition>();
  onCarConditionChange = output<CarCondition>();

  doors = input<number | null>();
  onDoorsChange = output<number | null>();

  seats = input<number | null>();
  onSeatsChange = output<number | null>();

  ngOnInit(): void {
    for (let i = 1990; i <= new Date().getFullYear(); i++) {
      this.yearSelection.push(i);
    }
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((event: any) =>
        this.onSearchWordChange.emit(event.target.value)
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
