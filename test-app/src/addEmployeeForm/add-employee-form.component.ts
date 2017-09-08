import {Component} from '@angular/core';

import {Employee} from '../app/employee';

import {JsonReaderService} from '../app/gridplayground/services/json-reader.service';

import {JsonWriterService} from '../app/gridplayground/services/json-writer.service';

@Component({
  selector: 'add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css'],
  providers: [JsonWriterService ]
})

export class AddEmployeeFormComponent {
  constructor(private jsonReader: JsonReaderService,
              private jsonWriter: JsonWriterService) {

  }

  model = new Employee(200, 'oscar', 'manrique', 'ol@myemail.com', '+345632569', '10/06/1990');

  submitted = false;

  onSubmit() {
    let employeesJson;
    this.jsonReader.getDataFromJson('employees.json')
      .then(data => {
          let result;
          employeesJson = data;
          employeesJson.data.push(this.model.data);
          this.jsonWriter.writeDataToJsonFile('employees', employeesJson)
            .then(response => {
              result = response;
              console.log('Result:' + result);
              this.submitted = true;
            });
        }
      );
  }

  // TODO: remove this when we're done

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  newEmployee() {
    this.model = new Employee(0, '', '', '', '', '');
  }

}