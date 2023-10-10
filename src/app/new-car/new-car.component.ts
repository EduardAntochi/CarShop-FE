import { Component, OnInit } from '@angular/core';
import { CarHelper } from '../car/car-helper';
import { OptionParent } from '../option/option-parent';
import { CarsService } from '../cars/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionService } from '../option/option.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent extends CarHelper implements OnInit, OptionParent {
  constructor (
    private carsService: CarsService,
    private router: Router,
    private route: ActivatedRoute,
    optionService: OptionService
  ) {
    super(optionService);
  }

  ngOnInit(): void {
      this.resetCarDetails();
      this.addOption();
  }

  save(): void {
    this.pickSelectedOptions();
    this.carsService.saveCar(this.car)
    .subscribe(car => {this.car = car; this.viewCar()});
  }

  viewCar() {
    this.router.navigate([`/car/$(this.car.id)`], {relativeTo: this.route});
  }
}
