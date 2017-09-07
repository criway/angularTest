import {Component} from '@angular/core';

import {Employee} from '../app/employee';

@Component({
  selector: 'add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: [ './add-employee-form.component.css' ]
})

export class AddEmployeeFormComponent {
  model = new Employee(200, 'oscar', 'manrique', 'ol@myemail.com', '+345632569', '10/06/1990');

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  // TODO: remove this when we're done

  get diagnostic() {
    return JSON.stringify(this.model);
  }

}