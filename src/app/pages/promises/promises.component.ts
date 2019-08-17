import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countUntil(3)
      .then(res => console.log('End Promise', res))
      .catch(err => console.error('Error Promise', err));
  }

  ngOnInit() {
  }

  countUntil(limit: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter += 1;
        console.log('counter', counter);
        if (counter === limit) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
