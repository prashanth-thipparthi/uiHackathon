import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { FeaturesComponent } from './features/features.component';
import { AdministrationComponent } from './administration.component';
import { SharedModule } from '../shared/shared.module';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { ColorServiceModule } from '@ux-aspects/ux-aspects';
import { ColorServiceModule as GlobalColorServiceModule, colorSets, ColorService } from '@ux-aspects/ux-aspects';


const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview'
      },
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'features',
        component: FeaturesComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ChartsModule,
    ColorServiceModule
  ],
  declarations: [OverviewComponent, FeaturesComponent, AdministrationComponent]
})
export class AdministrationModule { constructor(colorService: ColorService) {
  colorService.setColorSet(colorSets.microFocus);
}}
