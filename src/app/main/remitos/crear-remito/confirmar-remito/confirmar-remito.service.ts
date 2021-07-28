import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyRemito {
    idTransporte: number,
    idTalonario: number,
    listaIdDetalle: number []
  }

@Injectable()
export class ConfirmarRemitoService {

    tipoVenta: number = 1;

    constructor(
        private _httpClient: HttpClient
    ) { }



    
    getAllTalonarios( body ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        console.log("body en service", body);

        let ruta = `${BASE_URL}pedidos/talonario/tipopedido/${ this.tipoVenta }`;

        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getAllTransportes(): Observable<any> {

        let ruta = `${BASE_URL}pedidos/transporte/`;
        return this._httpClient.get(ruta);
    }

    getUltimoNroCbte(id){

        let ruta = `${BASE_URL}pedidos/talonario/${id}`;
        return this._httpClient.get(ruta);
    }
    
    generarRemito( body: BodyRemito ){

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        console.log("body en service", body);

        let ruta = `${BASE_URL}pedidos/remito`;
        
        return this._httpClient.post(ruta, body, {headers: headers});
    }
}