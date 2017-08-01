import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {EmployeesService} from './services/employees.service';
@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: [ './employee-detail.component.css' ],
  providers: [ EmployeesService ]
})

export class EmployeeDetailComponent implements OnInit{
  employee;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeesService.getEmployee(+params.get('id')))
      .subscribe(incident => this.employee = incident);
  }
  goBack(): void {
    this.location.back();
  }
}
