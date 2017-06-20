import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//components
import { WeatherConditionsComponent } from './weather-conditions.component';
import { ConditionsListComponent } from './condition-list/conditions-list.component';
import { ConditionComponent } from './condition/condition.component';
import { AddConditionComponent } from './addcondition/addcondition.component';


//services
import { ConditionService } from './condition.service';

//modules
import { ConfigModule } from '../config';

const COMPONENTS =   [ WeatherConditionsComponent, ConditionsListComponent, ConditionComponent, AddConditionComponent ]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ConfigModule
  ],
  exports : COMPONENTS,
  providers: [ConditionService]
})
export class ConditionsModule { }
