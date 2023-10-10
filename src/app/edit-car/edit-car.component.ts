import { Component, OnInit } from '@angular/core';
import { CarHelper } from '../car/car-helper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarsService } from '../cars/cars.service';
import { OptionParent } from '../option/option-parent';
import { OptionService } from '../option/option.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent extends CarHelper implements OnInit, OptionParent {

  constructor(optionService: OptionService,
    private router: Router,
    private route: ActivatedRoute,
    private carsService: CarsService
    )
    {
      super(optionService);
    }

    ngOnInit(): void {
      this.resetCarDetails();
      this.getCar();
    }

    getCar(): void {
      // @ts-ignore
      const id = +this.route.snapshot.paramMap.get('id');
      this.carsService.getCar(id)
      .subscribe(car => {this.car = car; this.addOption();});
    }

    updateEdits(): void {
      this.pickSelectedOptions();
      this.carsService.updateCarDetails(this.car)
      .subscribe(retVal => this.viewCar());
    }

    viewCar() {
      this.router.navigate([`/car/$(this.car.id)`], {relativeTo: this.route});
    }
}
