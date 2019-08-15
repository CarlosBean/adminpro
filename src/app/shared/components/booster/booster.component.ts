import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styleUrls: []
})
export class BoosterComponent {

  @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;
  @Input() progress: number;
  @Input() title: string;
  @Output() output = new EventEmitter<number>();

  limit = { min: 0, max: 100 };
  booster = 5;

  updateValue(value: any) {
    const { min, max } = this.limit;

    this.progress = value > max ? max : value < min ? min : value;
    this.txtProgress.nativeElement.value = this.progress || min;
    this.output.emit(this.progress);
  }

  changeProgress(op: string) {
    const { min, max } = this.limit;

    const operators = {
      sub: (a: number) => a <= min ? min : a - this.booster,
      sum: (a: number) => a >= max ? max : a + this.booster
    };

    this.progress = operators[op](this.progress);
    this.output.emit(this.progress);
    this.txtProgress.nativeElement.focus();
  }
}
