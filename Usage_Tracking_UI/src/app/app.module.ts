import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeModule, downgradeComponent, setAngularJSGlobal } from '@angular/upgrade/static';
import { PageHeaderModule } from '@ux-aspects/ux-aspects';
import { HttpModule } from '@angular/http';
import { ColorServiceModule as GlobalColorServiceModule, colorSets, ColorService } from '@ux-aspects/ux-aspects';
import 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { ColorServiceModule } from '@ux-aspects/ux-aspects';

import * as angular from 'angular';
import '@ux-aspects/ux-aspects/ng1/ux-aspects-ng1';

import { AppComponent } from './app.component';
import { ContactService } from './service/contact-service'

const routes: Routes = [
  {
    path: 'applications',
    loadChildren: './applications/applications.module#ApplicationsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'applications'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    PageHeaderModule,
    UpgradeModule,
    ChartsModule,
    ColorServiceModule
  ],
  providers: [
    {
      provide: '$rootScope',
      useFactory: (injector: Injector) => injector.get('$rootScope'),
      deps: ['$injector']
    }
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {

  constructor(private _upgrade: UpgradeModule, colorService: ColorService) { 
    colorService.setColorSet(colorSets.microFocus);    
  }

  ngDoBootstrap() {
    this._upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}

/*
  AngularJS Module
*/
setAngularJSGlobal(angular);

angular.module('app', ['ux-aspects'])
  .directive('appRoot', downgradeComponent({ component: AppComponent }) as angular.IDirectiveFactory);

