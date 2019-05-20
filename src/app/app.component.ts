import { AutorizacionService } from './services/autorizacion.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquare';

  // lugares:any = [
  //   {plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia'},
  //   {plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita'},
  //   {plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices'},
  //   {plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi sushiroll'},
  //   {plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia'},
  //   {plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el clavo'}
  // ];
  lat: number = 4.6560663;
  lng: number = -74.0595918;

  loggedIn = false;
  loggedUser: any = null;
  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.isLogged()
      .subscribe((result) => {
        if (result && result.uid) {
          this.loggedIn = true;
          setTimeout(() => {
            this.loggedUser = this.autorizacionService.getUser().currentUser.email;
          }, 500);
        } else {
          this.loggedIn = false;
        }
      }, (error) => {
        this.loggedIn = false;
      })
  }
  logout() {
    this.autorizacionService.logout();
  }
}
