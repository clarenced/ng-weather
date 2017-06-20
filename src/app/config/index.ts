import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ConfigService } from './config.service';

@NgModule({
  declarations: [ ],
  imports: [ HttpModule, CommonModule ],
  exports: [ ],
  providers: [ConfigService],
})
export class ConfigModule { }
