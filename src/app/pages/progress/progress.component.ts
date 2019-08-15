import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  bar1 = 50;
  bar2 = 25;

  constructor() { }

  ngOnInit() {
  }
}
