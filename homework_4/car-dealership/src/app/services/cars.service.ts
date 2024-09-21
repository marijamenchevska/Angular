import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CreateCar } from '../types/cars.interface';
import { Response } from '../types/response.interface';
import { SearchQuery } from './../types/search-query.interface';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  carPath = 'http://localhost:3000/api/cars';

  constructor(private readonly http: HttpClient) {}

  getCars(searchQuery: SearchQuery = {}): Observable<Response<Car[]>> {
    return this.http.get<Response<Car[]>>(this.carPath, {
      params: {
        ...searchQuery,
      },
    });
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.carPath}/${id}`);
  }

  createCar(carBody: CreateCar): Observable<CreateCar> {
    return this.http.post<CreateCar>(this.carPath, carBody);
  }
}
