import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyDetalle{

    idTipo    : number;
    idDarsena : number;
    desdePedido     : string;
    hastaPedido     : string;
  }

@Injectable()
export class RemitoService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    getAllTipos(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidos/pedidotipo/`;
        return this._httpClient.get(ruta);
    }

    getAllDarsena(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidos/darsena/`;
        return this._httpClient.get(ruta);
    }

    getPedidosSinRemitir(body: BodyDetalle, busqueda, columna, order): Observable<any>
    {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar:string = '';
        if (busqueda !== '')
            buscar = `/${busqueda}`

        //let ruta = `${BASE_URL}pedidos/pedidodetalle/etapadarsena/porcomprobanteoarticulo/${buscar}/${buscar}/${buscar}/${columna}/${order}`;
        let ruta = `${BASE_URL}pedidos/pedidodetalle/etapadarsena/porcomprobanteoarticulo/${ buscar }/${ columna }/${ order }`;
        

        return this._httpClient.post(ruta, body, {headers: headers});
    }
}
