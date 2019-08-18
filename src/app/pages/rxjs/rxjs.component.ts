import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {
    this.suscription = this.seeCounter()
      // .pipe(retry(2))
      .subscribe(
        res => console.log('subs', res),
        err => console.error('error', err),
        () => console.log('observer complete')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
    this.suscription.unsubscribe();
  }

  seeCounter(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;

        const output = { value: counter };

        observer.next(output);

        /* if (counter === 3) {
          clearInterval(interval);
          observer.complete();
        } */

        /* if (counter === 2) {
          // clearInterval(interval);
          observer.error('help!');
        } */
      }, 1000);
    }).pipe(
      map(res => res.value), // map can be modify the returned value
      filter(value => value % 2 === 1) // filter must return a boolean
    );
  }

}
