import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddressBookComponent } from './addressbook/addressbook.component';
import { DataProtectorComponent } from './dataprotector/dataprotector.component';
import { ApplicationsComponent } from './applications.component';
import { SharedModule } from '../shared/shared.module';
import { ContactService } from '../service/contact-service';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    children: [
      {
        path: '',
        redirectTo: 'addressbook'
      },
      {
        path: 'addressbook',
        component: AddressBookComponent
      },
      {
        path: 'dataprotector',
        component: DataProtectorComponent
      },
      {
        path: '/app-chart/:contact_id',
        component: ChartComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartComponent, AddressBookComponent, DataProtectorComponent, ApplicationsComponent],
  providers:[ContactService]
})
export class ApplicationsModule { }
