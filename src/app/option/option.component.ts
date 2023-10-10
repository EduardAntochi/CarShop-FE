import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectedOption } from './selected-option';
import { Option } from './option';
import { OptionService } from './option.service';

@Component({
  selector: 'app-option',
  templateUrl:'./option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

  @Output() onAddNew = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
  @Input() injectedOption: SelectedOption;

  added: boolean = false;
  price: number;
  options: Option[];

  constructor(private optionService: OptionService) {}

  ngOnInit(): void {
      this.optionService.getAllOptions().subscribe(o => this.options = o);
      if(this.injectedOption.selectedOption !== 0) {
        this.added = true;
      }
  }

  select(selectedVal: any) {
    this.injectedOption.selectedOption = Number(selectedVal);
  }

  add() {
    this.added = true;
    this.onAddNew.emit(this);
  }

  remove() {
    this.added = false;
    this.onRemove.emit(this.injectedOption);
  }
}
