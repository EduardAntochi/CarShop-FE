import { Observable } from "rxjs";
import { Car } from "../car/car";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";

@Injectable({
    providedIn: 'root'
})

export class CarsService {
    private baseURLCars = environment.backendBaseURL + '/car'

    constructor(private http: HttpClient) {}

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.baseURLCars}/allcars`);
    }

    getCar(id: number): Observable<Car> {
        const url = `${this.baseURLCars}/car/${id}`;
        return this.http.get<Car>(url);
    }

    updateCarDetails(car: Car): Observable<{}> {
        console.log(car);
        return this.http.post<Car>(`${this.baseURLCars}/updateCarDetails`, car);
    }

    saveCar(car: Car): Observable<Car> {
        console.log(car);
        return this.http.post<Car>(`${this.baseURLCars}/new-car`, car);
    }

    deleteCar(car: Car): Observable<{}> {
        console.log('Delete car' + car);
        return this.http.post<Car>(`${this.baseURLCars}/delete-car`, car);
    }
}
