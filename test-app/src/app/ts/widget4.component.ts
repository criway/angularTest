import { Component } from '@angular/core';

@Component({
    selector: 'widget4',
    templateUrl: '../html/widget4.component.html',
    styleUrls: [ '../css/widget4.component.css' ]
})

export class Widget4Component {
  w4clicks;
  constructor() {
    this.w4clicks = 0;
  }
  add2Clicks() {
    this.w4clicks += 2;
  }

  child1ClickEvent(childClicks) {
    console.log('clickChildEvent, data: ' + event);
    this.updateW4clicks(childClicks);
  }

  updateW4clicks(newValue: number): void {
    this.w4clicks = newValue;
  }
}
