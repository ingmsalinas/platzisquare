import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style } from '@angular/animations';


@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0,
        backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)'
      }))
    ])
  ]
})
export class LugaresComponent {
  title = 'PlatziSquare';
  state = 'inicial';

  lat: number = 4.6560663;
  lng: number = -74.0595918;
  lugares = null;

  constructor(private lugaresService: LugaresService) {
    lugaresService.getLugares().subscribe(lugares => {
      //this.lugares = lugares 
      this.lugares = Object.values(lugares);
    }, error => {
      console.log('error');
      alert('Tenemos algo de dificultadoes, disculpe las molestias. Error: ' + error.statusText);
    })
  }
}
