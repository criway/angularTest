import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class JsonWriterService {
  constructor(private http: Http) {
  }

  writeDataToJsonFile(fileName: string, data: any): Promise<any> {
    data = JSON.stringify(data);
    return this.http.post('data/' + fileName + '.json', data).toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
