import { Component, OnInit } from '@angular/core';

import { Condition } from './condition/condition';
import { City } from './condition/city';

import { ConditionService } from './condition.service';

@Component({
  selector: 'ng-weather-component',
  templateUrl: 'weather.component.html'
})

export class WeatherConditionsComponent implements OnInit {

  conditions: Condition[] = [];
  cities: City[] = [];

  constructor(private conditionService: ConditionService) { }

  ngOnInit() {
    this.conditionService.getCondition().subscribe(conds => this.conditions.push(conds));
   }

   searchCity(cityName) {
     if (cityName) {
        this.conditionService.getCities().subscribe(searchedCities => {
        const found = searchedCities.filter(city => {
          return city.city.toLowerCase() === cityName.toLowerCase();
        });
        this.cities = [...found];
      });
     } else {
       this.cities = [];
     }
   }

   addCity(city) {
    console.log(city);
    this.conditionService
        .getConditionByLatitudeLongitude(city.latitude, city.longitude)
        .subscribe(condition => {
          this.conditions.push(condition);
        })
   }
}
