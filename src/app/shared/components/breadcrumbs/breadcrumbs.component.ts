import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(private router: Router, private pageTitle: Title, private meta: Meta) {
    this.getRouteData().subscribe(data => {
      this.title = data.title;
      this.pageTitle.setTitle(data.title);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: `A specific description about ${data.title}`
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getRouteData(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

}
