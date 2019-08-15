import { Component, OnInit, Input } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-donut-graphic',
  templateUrl: './donut-graphic.component.html',
  styleUrls: []
})
export class DonutGraphicComponent implements OnInit {

  @Input() data: SingleDataSet;
  @Input() labels: Label;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
