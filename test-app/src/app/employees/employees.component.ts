import { Component, OnInit } from '@angular/core';
import {HttpModule} from '@angular/http';

import { EmployeesService } from './services/employees.service';

@Component ({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.css' ],
  providers: [ EmployeesService ]
})

export class EmployeesComponent implements OnInit {

  employeesList;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.employeesService.getEmployees().then(employees =>  {
      console.log(employees);
      this.employeesList = employees;
    });


  }
}
