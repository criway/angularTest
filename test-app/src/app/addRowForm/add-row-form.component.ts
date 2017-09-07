import { Component, Input }from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'add-row-form',
  templateUrl: './add-row-form.component.html'
})

export class AddRowFormComponent {
  @Input() coldefs: object[];
}
