import { Component } from '@angular/core';

@Component ({
  selector: 'grid-playground',
  templateUrl: './grid-playground.component.html',
  styleUrls: [ './grid-playground.component.css' ]
})

export class GridPlaygroundComponent {
  columnDefs;
  rowData;
  constructor() {
    this.columnDefs = [
      {headerName: "Make", field: "make"},
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}     
    ];

    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porche", model: "Boxter", price: 72000}
    ];
    console.log(this.columnDefs);
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }
}
