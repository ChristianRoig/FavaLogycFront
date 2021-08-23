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

    crearOrdenDeDistribucion( body ): Observable<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/distribucion`;
        return this._httpClient.post(ruta, body, {headers: headers});
    }
    
    getOrdenById( idOrden: number ){
        let ruta = `${BASE_URL}pedidos/distribucion/${ idOrden }`;
        return this._httpClient.get(ruta);
    }

    actualizarOrdenDistribucion( idOrden, body ): Observable<any>{
        
        let headers = new HttpHeaders({
          "Content-Type": "application/json"
        });
        
        let ruta = `${BASE_URL}pedidos/distribucion/${ idOrden }`;
        return this._httpClient.put(ruta, body,{headers: headers});
    }
    
    getAllTransportes( body ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/transporte//por-remitos`;

        return this._httpClient.post(ruta, body, {headers: headers});
    }

    
    getAllTurnos( body ): Observable<any> {

        let headers = new HttpHeaders({
          "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/pedidoturno`;

        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getAllFechasDeEntregaExistentes( body ): Observable<any> {

        let headers = new HttpHeaders({
          "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/fechaentrega`;

        return this._httpClient.post(ruta, body, {headers: headers});
    }
   

}