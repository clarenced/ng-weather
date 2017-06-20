
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import * as moment from 'moment';

import { AbstractService } from '../common/abstract.service';
import { Condition } from './condition/condition';
import { City } from './condition/city';

import { ConfigService } from '../config/config.service';

@Injectable()
export class ConditionService extends AbstractService {

  constructor(private http: Http, private configService: ConfigService) { super(); }

  getCondition(country?: string, city?: string): Observable<Condition> {
    return this.configService.getConfig().map(config => {
      const countryParam = country ? country : config.country;
      const cityParam = city ? city : config.city;
      return `${config.apiUrl}${config.apiKey}/conditions/lang:${config.lang}/q/${countryParam}/${cityParam}.json`;
    }).flatMap(url => {
      return this.http.get(url).map(this.extractData).map(this.map);
    });
  }

  getConditionByLatitudeLongitude(latitude?: number, longitude?: number): Observable<Condition> {
    return this.configService.getConfig().map(config => {
      const latitudeParam = latitude ? latitude : config.latitude;
      const longitudeParam = longitude ? longitude : config.longitude;
      return `${config.apiUrl}${config.apiKey}/conditions/lang:${config.lang}/q/${latitudeParam},${longitudeParam}.json`;
    }).flatMap(url => {
      return this.http.get(url).map(this.extractData).map(this.map);
    });
  }

  getCities() : Observable<City[]> {
    return this.configService.getCities().map(cities => {
      return cities.map(city => {
        const c = new City();
        c.city = city.name;
        c.country = city.country;
        c.longitude = city.coord.lon;
        c.latitude = city.coord.lat;
        return c;
      });
    });
  }

  map(from: any): Condition {
    const condition = new Condition();
    const weatherCity = new City();
    weatherCity.city = from.current_observation.display_location.city;
    weatherCity.country = from.current_observation.display_location.country;
    condition.weatherCity = weatherCity;

    condition.icon = from.current_observation.icon;
    condition.icon_url = from.current_observation.icon_url;
    condition.temperature = from.current_observation.temp_c;
    condition.weather = from.current_observation.weather;
    condition.vent = from.current_observation.wind_kph;
    condition.humidite = from.current_observation.relative_humidity;
    condition.precipitation = from.current_observation.precip_today_metric;
    const time = moment.unix(from.current_observation.local_epoch).locale('fr').format('ddd hh');
    condition.dateTime = time.substring(0, 1).toUpperCase() + time.substring(1);
    return condition;
  }
}
