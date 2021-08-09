import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { observeOn } from 'rxjs/operators';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyDetalle{

    idTipo : number;
    idTurno : number;
    idOrigen : number;
    idEtapa : number;
    idProvincia : number;
    idLocalidad : number;
    desdePedido : string;
    hastaPedido : string;
    idLote : number;
  }

@Injectable()
export class PopUpOrdenControladaService {
    
    constructor( private _httpClient: HttpClient ) {}

    descargarCOT( idOrdenDist: number ): Observable<any> {  

        let ruta = `${ BASE_URL }pedidos/distribucion/cot/${ idOrdenDist }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

}
