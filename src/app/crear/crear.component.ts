import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  lugar: any = {};
  id: any = null;
  constructor(private lugaresService: LugaresService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new') {
      this.lugaresService.getLugar(this.id).subscribe((lugar) => { this.lugar = lugar })
    }
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
}
