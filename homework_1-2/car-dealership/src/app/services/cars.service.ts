import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Car } from '../types/cars.interface';
import carsJson from '../../data/cars.json';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  // BehaviorSubject is a special type of Subject which holds an initial value, emits its latest value to all its subscribers, and is directly MODIFIABLE
  // Since it's modifiable, we want to ensure that no one outside of this service can modify it by first - making it private, and second - creating an Observable from it, which is public and can be accessed by anyone
  // Observables are UNmodifiable Subjects which don't hold an initial value, and only emit a value to its subscribers once an action somewhere has triggered its change
  // We don't want to make _cars an Observable from the get-go, because then we would need a trigger so that the components using it receive the data (car array)
  // Also, by using the method asObservable on the BehaviorSubject _cars, the property of emitting the latest value is NOT lost, i.e. even though cars is an Observable, aside from being directly unmodifiable, it will still emit its latest value to all its subscribers

  private _cars: BehaviorSubject<Car[]> = new BehaviorSubject(
    carsJson as Car[]
  );

  cars: Observable<Car[]> = this._cars.asObservable();

  // JS filter function can't be used on an observable (cars), which is why the observable is transformed in the pipe with the map operator function
  // rxjs' filter operator function can't be used in the pipe because its purpose is not to filter values in an array (like the JS filter function), but to filter out the stream of observables
  getCar(id: string): Observable<Car | undefined> {
    return this.cars.pipe(map((cars) => cars.find((car) => car.id === id)));
  }
}
