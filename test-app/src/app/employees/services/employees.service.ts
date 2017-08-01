import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
@Injectable()

export class EmployeesService {
  private userUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: Http) {}

  getEmployees(): Promise <any> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getEmployee(id: any): Promise<any> {
    return this.getEmployees()
      .then(employees => employees.find(employee => employee.id === id));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
