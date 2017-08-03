import {Component, Input, Output, OnChanges, SimpleChange, EventEmitter} from '@angular/core';

@Component({
    selector: 'widget1',
    templateUrl: '../html/widget1.component.html',
    styleUrls: [ '../css/widget1.component.css' ]
})

export class Widget1Component implements OnChanges {
  @Output() onClickChildEvent = new EventEmitter<number>();
  @Input() numberOfClicks: number;

  constructor() {
      this.numberOfClicks = 0;
  }

  addClick() {
    this.numberOfClicks++;
    this.onClickChildEvent.emit(this.numberOfClicks);
  }

  ngOnChanges(changes: {[property: string]: SimpleChange}) {
    console.log(changes);
  }
}
