import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyRemito {
    idTransporte:   number,
    idDeposito:     number,
    idTalonario:    number,
    listaIdDetalle: number []
  }

@Injectable()
export class ConfirmarOrdenDeDistribucionService
{
    constructor(
        private _httpClient: HttpClient
    ) { }

    crearOrdenDeDistribucion( body ){

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/distribucion`;
        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getAllTransportes(): Observable<any> {
        let ruta = `${BASE_URL}pedidos/transporte/`;
        return this._httpClient.get(ruta);
    }
    
    getAllTurnos(): Observable<any> {
        let ruta = `${BASE_URL}pedidos/pedidoturno`;
        return this._httpClient.get(ruta);
    }

    getAllLocalidades(): Observable<any> {
        let ruta = `${BASE_URL}pedidos/localidad`;
        return this._httpClient.get(ruta);
    }

}