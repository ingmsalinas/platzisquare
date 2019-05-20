import { HttpClient } from '@angular/common/http';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  lugar: any = {};
  id: any = null;
  results$ = new Observable<any>();
  private searchField: FormControl;
  API_KEY = 'AIzaSyDHdArR5gWQAgZKI09JuQjdj0lTTepl2uc';
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: HttpClient) {
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new') {
      this.lugaresService.getLugar(this.id)
        .subscribe((lugar) => {
          this.lugar = lugar
        });
    }
    const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .pipe(debounceTime(500),
        switchMap(
          query => this.http.get(`${URL}?address=${query}&key=${this.API_KEY}`))
        , map((response: any) => {
          return response.results;
        })
      );
  }

  guardarLugar() {
    var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    //ACTIVAR SI SE ACABA LA CUOTA DE REQUESTS DE GOOGLE MAPS
    this.lugar.lat = 37.4224764;
    this.lugar.lng = -122.0842499;

    if (this.id != 'new') {
      this.lugaresService.editarLugar(this.lugar);
      alert('Negocio editado con éxito!');
    } else {
      this.lugar.id = Date.now();
      this.lugaresService.guardarLugar(this.lugar);
      alert('Negocio guardado con éxito!');
    }
    this.lugar = {};

    //DESACTIVAR SI SE ACABA LA CUOTA DE REQUESTS DE GOOGLE MAPS
    //CTRL + K + U/C
    // this.lugaresService.obtenerGeoData(direccion)
    //   .subscribe((result) => {
    //     this.lugar.lat = result[0].geometry.location.lat;
    //     this.lugar.lng = result[0].geometry.location.lng;
    //     this.lugar.id = Date.now();
    //     this.lugaresService.guardarLugar(this.lugar);
    //     alert('Negocio guardado con éxito!');
    //     this.lugar = {};
    //   });
  }

  seleccionarDireccion(direccion) {
    this.lugar.calle = direccion.address_components[1].long_name + ' ' + direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[6].long_name;


  }
}
