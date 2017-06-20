import { Component, OnInit, Input } from '@angular/core';

import { ConditionService } from '../condition.service';
import { Condition } from './condition';


@Component({
  selector: 'ng-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent {

  @Input()
  condition: Condition;

  constructor(private conditionService: ConditionService) {  }

}
