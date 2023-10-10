import { Injectable } from "@angular/core";
import { Car } from "../car/car";
import { Option } from "../option/option";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, delay, dematerialize, materialize, mergeMap, of } from "rxjs";

let cars: Car[] = [
    {id: 1, edition:'2023', engine:'4.0L, V8, 571 HP, 800 Nm', fuelType:'Petrol(mild) Hybrid', make:'Audi', model:'S8', price: 138600.00, transmission: 'Automatic-Tiptronic 8 speed gearbox', selectedOptions: [{carId:1, price:90, selectedOption:1}, {carId:1, price:50, selectedOption:2}, {carId:1, price:100, selectedOption:3}]},
    {id: 2, edition:'2023', engine: '4.0L, 557 HP + 22 HP, 770 Nm', fuelType: 'Petrol Super', make: 'Mercedes', model: 'Maybach GLS 600 4MATIC', price: 201370.00, transmission: 'Automatic', selectedOptions: []},
    {id: 3, edition:'2023', engine: '4.4L, 625 HP, 750 Nm', fuelType: 'Petrol', make: 'BMW', model: 'X6 M Competition', price: 147501.00, transmission: 'Automatic', selectedOptions: []},
    {id: 4, edition:'2023', engine: '4.4L, 600 HP, 750 Nm', fuelType: 'Petrol', make: 'BMW', model: 'M8 Gran Coupe', price: 163090.00, transmission: 'Automatic', selectedOptions: []},
    {id: 5, edition:'2023', engine: '4.0L, V8, 630 HP, 800 Nm', fuelType: 'Petrol', make: 'Audi', model: 'RS7 Sportback', price: 140200.00, transmission: 'Automatic-Tiptronic 8 speed gearbox', selectedOptions: []},
    {id: 6, edition:'2023', engine: '3.0L, V6, 550 HP, 650 Nm', fuelType: 'Premium Petrol', make: 'Maserati', model: 'GranTurismo Trofeo', price: 225450.00, transmission: 'Automatic', selectedOptions: []},
    {id: 7, edition:'2023', engine: '3.0L, 435 HP + 22 HP, 520 Nm', fuelType: 'Premium Petrol', make: 'Mercedes', model: 'AMG GT53 4MATIC + 4 door Coupe', price: 134650.00, transmission: 'Automatic', selectedOptions: []},
    {id: 8, edition:'2023', engine: '3.0L, V6, 474 HP, 600 Nm', fuelType: 'Premium Petrol', make: 'Porsche', model: 'Cayenne S Coupe', price: 121023.00, transmission: 'Automatic 8 speed gearbox', selectedOptions: []},
    {id: 9, edition:'2023', engine: '4.0L, V6, 474 HP, 600 Nm', fuelType: 'Premium Petrol', make: 'Porsche', model: 'Cayenne S', price: 115454.99, transmission: 'Automatic 8 speed gearbox', selectedOptions: []},
    {id: 10, edition:'2023', engine: '3.0L, V6, 450 HP, 600 Nm', fuelType: 'Petrol', make: 'Audi', model: 'RS5 Sportback TFSi quattro', price: 94600.00, transmission: 'Automatic-Tiptronic 8 speed gearbox', selectedOptions: []},
]

let options: Option[] = [
    {id: 1, name: 'Park assist plus'},
    {id: 2, name: '360-degree cameras'},
    {id: 3, name: 'Night vision assistant'},
    {id: 4, name: 'Head-up display'},
    {id: 5, name: 'Anti-theft alarm system'},
    {id: 6, name: '4-zone climate control system'},
    {id: 7, name: 'ISOFIX and top tether for outer rear seats'},
    {id: 8, name: 'Fuel tank with increased volume'},
    {id: 9, name: 'First aid kit with warning triangle and safety vests'},
    {id: 10, name: 'Safety package'},
    {id: 11, name: 'Bang & Olufsen premium sound system with 3D sound'},
    {id: 12, name: 'Dynamic all-wheel steering'},
    {id: 13, name: 'Front cross traffic assist'},
    {id: 14, name: 'HD Matrix feature'},
    {id: 15, name: 'Separate daytime running light'},


    {id: 16, name: 'Ambient Lighting package plus'},
    {id: 17, name: 'Selector lever in carbon'},
    {id: 18, name: 'Air ionizer and aromatization'},
    {id: 19, name: 'Headliner in Black fabric'},
    {id: 20, name: 'Sun visor on driver and front passenger side'},
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): Observable<HttpEvent<any>>{
            switch (true) {
                case url.endsWith('/allcars') && method === 'GET':
                    return getCars();
                case url.match('/car//[0-9]') && method === 'GET':
                    return getCarById();
                case url.match('/car-edit//[0-9]') && method === 'GET':
                    return getCarById();
                case url.match('/delete-car') && method === 'POST':
                    return deleteCar();
                case url.match('/updateCarDetails') && method === 'POST':
                    return updateCar();
                case url.match('/new-car') && method === 'POST':
                    return newCar();
                case url.endsWith('/all-options') && method === 'GET':
                    return getOptions();
                default:
                    
                    return next.handle(request);
            }
        }

        function getCars(): Observable<HttpEvent<any>> {
            return ok(cars);
            // return of(new HttpResponse({status: 200, body: cars}));
        }

        function getCarById(): Observable<HttpEvent<any>> {
            const carfound = cars.find(x => x.id == idFromUrl());
            const carfoundCopy = {...carfound};
            // @ts-ignore
            carfoundCopy.selectedOptions = [...carfound.selectedOptions];
            return ok(carfoundCopy);
        }

        function deleteCar(): Observable<HttpEvent<any>> {
            var car = carFromBody();
            cars = cars.filter(x => x.id !== car.id);
            return ok('');
        }
        
        function updateCar(): Observable<HttpEvent<any>> {
            var car = carFromBody();
            cars = cars.filter(x => x.id !== car.id);
            cars.push(car);
            return ok(car);
        }

        function newCar(): Observable<HttpEvent<any>> {
            var car = carFromBody()
            // var max = Math.max.apply(Math, cars.map(e => e.id));
            const numbersOrNull = cars.map(e => e.id);
            const numbers = numbersOrNull.filter(e => e != null) as number[];
            const max = Math.max.apply(Math, numbers);

            car.id = max === undefined ? 1 : max+1;
            car.selectedOptions.forEach(e => e.carId = max);
            cars.push(car);
            return ok(car);
        }

        function ok(body: any): Observable<HttpEvent<any>> {
            return of(new HttpResponse({ status: 200, body }))
        }

        function carFromBody(): Car {
            const car: Car = body;
            return car
        }

        function getOptions(): Observable<HttpEvent<any>> {
            return ok(options);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
