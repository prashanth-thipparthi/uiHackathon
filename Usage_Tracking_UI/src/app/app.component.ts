import { Component } from '@angular/core';
import { PageHeaderNavigationItem, PageHeaderIconMenu } from '@ux-aspects/ux-aspects';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  items = [
    {
      title: 'Products'
    }
  ];

  constructor(private _router: Router) {

    // perform initial navigation - required in a hybrid application
    _router.initialNavigation();

    // initially select the correct page header item
    _router.events.pipe(filter(event => event instanceof NavigationEnd), first()).subscribe((event: NavigationEnd) => {
      event.urlAfterRedirects.startsWith('/applications');
    });
  }
}
