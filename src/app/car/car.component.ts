import { Component, OnInit } from '@angular/core';
import { CarHelper } from './car-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { CarsService } from '../cars/cars.service';
import { OptionService } from '../option/option.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent extends CarHelper implements OnInit {

  editing: boolean;

  constructor (
    private route: ActivatedRoute,
    private carsService: CarsService,
    private location: Location,
    private router: Router,
    optionService: OptionService
  ) {
    super(optionService);
    this.editing = false;
  }

  ngOnInit(): void {
      this.resetCarDetails();
      this.getCar();
  }

  getCar() : void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.carsService.getCar(id)
    .subscribe(car => { this.car = car; console.log(car)});
  }

  goBack(): void {
    this.location.back();
  }

  edit(): void {
    this.editing = true;
  }

  isEditing(): boolean {
    console.log('editing = ' + this.editing);
    return this.editing;
  }

  delete(): void {
    this.carsService.deleteCar(this.car).subscribe(e => {this.goToCars(); });
  }

  goToCars() {
    this.router.navigate(['/cars'], {relativeTo: this.route});
  }
}
