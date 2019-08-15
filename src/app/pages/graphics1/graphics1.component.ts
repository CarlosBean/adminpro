import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {

  graficos: any = [
    {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      leyenda: 'El pan se come con'
    },
    {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      leyenda: 'Entrevistados'
    },
    {
      labels: ['Si', 'No'],
      data: [95, 5],
      leyenda: '¿Le dan gases los frijoles?'
    },
    {
      labels: ['No', 'Si'],
      data: [85, 15],
      leyenda: '¿Le importa que le den gases?'
    },
  ];

  doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData: SingleDataSet = [350, 450, 100];
  doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
