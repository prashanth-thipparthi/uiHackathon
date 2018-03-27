import { Component } from '@angular/core';
import { SideNavigationItem } from '../shared/side-navigation/side-navigation.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.less']
})
export class ApplicationsComponent {

  navigation: SideNavigationItem[] = [
    {
      title: 'Address Book',
      icon: '',
      path: 'addressbook'
    },
    {
      title: 'Data Protector',
      icon: '',
      path: 'dataprotector'
    }
  ];

}
