import { Component, Output, Input, EventEmitter } from '@angular/core';


import { City } from '../condition/city';

@Component({
  selector: 'ng-addcondition',
  templateUrl: './addcondition.component.html',
  styleUrls: ['./addcondition.component.css']
})
export class AddConditionComponent {

  @Input()
  cities: City[] = [];

  @Output()
  onSearchCity = new EventEmitter();

  @Output()
  onAddCity = new EventEmitter();

  addCity(event: any) {
    this.onAddCity.emit(event);
    this.cities = [];
  }

  searchCity(event: any){
     if (event.target.value.length > 3) {
      this.onSearchCity.emit(event.target.value);
     }
  }

  openModal() {
    const modal = document.getElementsByClassName('modal');
    modal[0].classList.toggle('is-active');
  }

  closeModal() {
    const modal = document.getElementsByClassName('modal');
    modal[0].classList.toggle('is-active');
  }
}
