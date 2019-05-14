import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LugaresService {
    API_ENDPOINT = 'https://platzisquare-240122.firebaseio.com';
    lugares: any = [
        { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería la Gardenia', description: 'Descripción de este negocio. Más adelante tendremos más información.' },
        { id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas la pasadita', description: 'Descripción de este negocio. Más adelante tendremos más información.' },
        { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices', description: 'Descripción de este negocio. Más adelante tendremos más información.' },
        { id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi sushiroll', description: 'Descripción de este negocio. Más adelante tendremos más información.' },
        { id: 5, plan: 'pagado', cercania: 3, distancia: 35, active: true, nombre: 'Hotel la Gracia', description: 'Descripción de este negocio. Más adelante tendremos más información.' },
        { id: 6, plan: 'gratuito', cercania: 3, distancia: 120, active: false, nombre: 'Zapatería el clavo', description: 'Descripción de este negocio. Más adelante tendremos más información.' }
    ];
    constructor(private afDB: AngularFireDatabase, private http: HttpClient) {

    }
    public getLugares() {
        //return this.afDB.list('lugares/').valueChanges(); 
        return this.http.get(this.API_ENDPOINT + '/.json').pipe(map(resultado => resultado['lugares']));
    }
    public buscarLugar(id) {
        return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
    }
    public guardarLugar(lugar) {
        //this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_ENDPOINT + '/lugares.json', lugar, { headers: new HttpHeaders({ 'Content-Type': 'application:json' }) }).subscribe();
    }
    public editarLugar(lugar) {
        this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
    }
    public obtenerGeoData(direccion) {
        var urlAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + direccion + '&Key=' + 'AIzaSyDHdArR5gWQAgZKI09JuQjdj0lTTepl2uc';
        //return this.http.get(urlAPI);
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDHdArR5gWQAgZKI09JuQjdj0lTTepl2uc');
    }
    public getLugar(id) {
        return this.afDB.object('lugares/' + id).valueChanges();
    }
}