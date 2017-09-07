import {Injectable} from '@angular/core';

interface ColumnDefinitions {
  columnDefs: object;
  fields: string[];
}

@Injectable()

export class TransformJsonToAgGridService {
  rowData;

  private getColDefsArray(header, data): ColumnDefinitions {
    const columnDefs = [];
    const fieldKeys = Object.keys(data[0]);
    header.colNames.forEach(function (name, index) {
      columnDefs.push(
        {
          'headerName': name,
          'field': fieldKeys[index]
        }
      );
    });

    return {'columnDefs': columnDefs, 'fields': fieldKeys};
  }

  transformToAgGrid(data): object {
    // data must have 2 properties: header and data, both arrays
    const definitions: ColumnDefinitions = this.getColDefsArray(data.header, data.data);
    return {
      columnDefs: definitions.columnDefs,
      fields: definitions.fields,
      rowData: data.data
    };
  }
}
