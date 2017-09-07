import {Injectable} from '@angular/core';

@Injectable()

export class TransformJsonToAgGridService {
  rowData;

  private getColDefsArray(header, data): object[] {
    const columnDefs = [];
    const fieldKeys = Object.keys(data[0]);
    header.colNames.forEach(function(name, index) {
      columnDefs.push(
        {
          'headerName': name,
          'field': fieldKeys[index]
        }
      );
    });
    return columnDefs;
  }
  transformToAgGrid(data): object {
    // data must have 2 properties: header and data, both arrays
    const colDefs = this.getColDefsArray(data.header, data.data);
    return {
      columnDefs: colDefs,
      rowData: data.data
    };
  }
}
