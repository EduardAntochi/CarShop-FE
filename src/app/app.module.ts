import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';
import { NewCarComponent } from './new-car/new-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { OptionComponent } from './option/option.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './environments/environment.prod';
import { FakeBackendInterceptor } from './HTTP/http-interceptor';

const appRoutes: Routes = [
    {path: 'cars', component: CarsComponent},
    {path: 'car/:id', component: CarComponent},
    {path: 'car-edit/:id', component: EditCarComponent},
    {path: 'new-car', component: NewCarComponent},
    {path: '', redirectTo: 'cars', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        CarsComponent,
        NewCarComponent,
        CarComponent,
        OptionComponent,
        EditCarComponent
    ],

    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],

    providers: environment.production ? [] : [
        FakeBackendInterceptor
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor() {
        console.log('Prod environment: ' + environment.production);
    }
}
