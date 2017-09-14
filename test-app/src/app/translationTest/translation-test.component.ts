import {Component} from '@angular/core';

@Component({
  selector: 'translation-test',
  templateUrl: 'translation-test.component.html'
})

export class TranslationTestComponent {
  wolves = 0;

  inc(i: number) {
    this.wolves = Math.min(5, Math.max(0, this.wolves + i));
  }
}
