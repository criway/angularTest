import {Component} from '@angular/core';

import {JsonReaderService} from './services/json-reader.service';
import {TransformJsonToAgGridService} from './services/transform-json-to-ag-grid.service';

@Component({
  selector: 'grid-playground',
  templateUrl: './grid-playground.component.html',
  styleUrls: ['./grid-playground.component.css'],
  providers: [JsonReaderService,
    TransformJsonToAgGridService]
})

export class GridPlaygroundComponent {
  columnDefs;
  rowData;
  employees: object;

  constructor(private jsonReaderService: JsonReaderService,
              private transformJsonToAgGridService: TransformJsonToAgGridService) {
    this.columnDefs = [
      {headerName: 'Make', field: 'make'},
      {headerName: 'Model', field: 'model'},
      {headerName: 'Price', field: 'price'}
    ];

    this.rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porche', model: 'Boxter', price: 72000}
    ];
    console.log(this.columnDefs);
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  getTestData(): void {
    this.jsonReaderService.getDataFromJson('employees.json')
      .then(data => {
        this.employees = data;
        this.employees = this.transformJsonToAgGridService.transformToAgGrid(this.employees);
      });
  }
}
