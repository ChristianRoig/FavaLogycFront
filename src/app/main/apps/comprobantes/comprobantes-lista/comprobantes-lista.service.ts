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
    idEstado : number;
    idEtapa : number;
    idProvincia : number;
    idLocalidad : number;
    desdePedido : string;
    hastaPedido : string;
    lote : string;
    desdeLote : string;
    hastaLote : string;

    /* 
    "idTipo" : 1, (numerico o null)
    "idTurno" : 1, (numerico o null)
    "idOrigen" : 15, (numerico o null)
    "idEstado" : 3, (numerico o null)
    "idEtapa" : 3, (numerico o null)
    "idProvincia" : 1, (numerico o null)
    "idLocalidad" : 798, (numerico o null)
    "desdePedido" : null, (tipo date (AAAA-MM-DD) o null)
    "hastaPedido" : "2020-01-06", (tipo date (AAAA-MM-DD) o null)
    "lote" : 1, (string o null)
    "desdeLote" : null, (tipo date (AAAA-MM-DD) o null)
    "hastaLote" : "2020-06-17" (tipo date (AAAA-MM-DD) o null) */
  }

@Injectable()
export class ComprobantesListaService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    getPedidosDetalles( body: BodyDetalle, busqueda, page, size, columna, order ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`

        //getOne?
        //let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ comprobante }/${ page }/${ size }/${ sortBy }/${ order }`;
        //getAll
        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ page }/${ size }/${ columna }/${ order }`; 

        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getPedidoDetalle( body: BodyDetalle, busqueda, page, size, columna, order ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`

        //getOne?
        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ busqueda }/0/10/nroCbte/asc`;
        //getAll
        //let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ page }/${ size }/${ columna }/${ order }`; 

        return this._httpClient.post(ruta, body, {headers: headers});
    }
}
