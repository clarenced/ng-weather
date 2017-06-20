import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';



import { City } from '../condition/city';
import { Condition } from '../condition/condition';

@Component({
  selector: 'ng-conditions-list',
  templateUrl: './condition-list.component.html'
})
export class ConditionsListComponent implements OnInit {

  @Input()
  conditions: Condition[] = [];

  constructor() {  }

  ngOnInit() {

  }
}
