import { Component } from '@angular/core';
import { NavigationBarItem } from '../shared/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent {

  navigation: NavigationBarItem[] = [
    {
      title: 'Overview',
      path: 'overview'
    },
    {
      title: 'Features',
      path: 'features'
    }
  ];
}
