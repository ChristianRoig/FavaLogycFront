import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { observeOn } from 'rxjs/operators';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class TablePedidosService
{
    constructor(
        private _httpClient: HttpClient) { }

    getArticulosDePedidos( body ,page, size, columna, order ): Observable<any> {
        
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/pedidodetalle/articulos-de-pedidos/${ page }/${ size }/${ columna }/${ order }`;

        //return this._httpClient.post(ruta, {headers: headers});
        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getArticuloDePedido( body, busqueda, page, size, columna, order ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`

        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ busqueda }/0/10/nroCbte/asc`;
        //getAll
        //let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ page }/${ size }/${ columna }/${ order }`; 

        return this._httpClient.post(ruta, body, {headers: headers});
    }
}
