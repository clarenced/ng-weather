

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AbstractService } from '../common/abstract.service';
import { Config } from './config';


@Injectable()
export class ConfigService extends AbstractService {
  constructor(private http: Http) { super() }

  // TODO mettre dans la sessionstorage
  getConfig(): Observable<Config> {
    return this.http.get('./src/app/config/config.json').map(this.extractData).catch(this.handleError);
  }

  getCities() : Observable<any[]> {
    return this.http.get('./src/app/config/city.list.json').map(this.extractData).catch(this.handleError);
  }

public extractData(res: Response) {
  const body = res.json();
  return (body.data ? body.data : body)  ||  {};
}

public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  public map(from: any) : any {}
}
