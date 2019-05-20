import { MyGuard } from './services/my-guard.service';
import { AutorizacionService } from './services/autorizacion.service';
import { CrearComponent } from './crear/crear.component';
import { LugaresService } from './services/lugares.service';
import { ContactoComponent } from './contacto/contacto.component';
import { DetalleComponent } from './detalle/detalle.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ApplicationRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { LugaresComponent } from './lugares/lugares.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MainPipe } from './main-pipe.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


const appRoutes: Routes = [
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'crear/:id', component: CrearComponent, canActivate: [MyGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyDtlZPo8JD8LZHc9XG8FqzKnrwzDD4p4V0",
  authDomain: "platzisquare-240122.firebaseapp.com",
  databaseURL: "https://platzisquare-240122.firebaseio.com",
  storageBucket: "platzisquare-240122.appspot.com",
  messagingSenderId: "960355816099"
};

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCYzqCWMQeXHVvqV2AzyH0V3XhqubE2fmo'
      apiKey: 'AIzaSyDHdArR5gWQAgZKI09JuQjdj0lTTepl2uc'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    MainPipe,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [LugaresService, AngularFireDatabase, AutorizacionService, AngularFireAuth, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
