import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ApplicationRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';

const appRoutes: Routes = [
  {path: '', Component: AppComponent},
  {path: 'lugares', Component: AppComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYzqCWMQeXHVvqV2AzyH0V3XhqubE2fmo'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
