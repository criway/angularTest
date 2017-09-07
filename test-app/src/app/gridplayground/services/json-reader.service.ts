import {Injectable} from '@angular/core';
import { Http } from '@angular/http';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonReaderService {
  constructor(private http: Http) {
  }

  getDataFromJson(fileName: string): Promise<object> {
    return this.http.get('data/' + fileName)
      .toPromise()
      .then(data => {
        return data.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
