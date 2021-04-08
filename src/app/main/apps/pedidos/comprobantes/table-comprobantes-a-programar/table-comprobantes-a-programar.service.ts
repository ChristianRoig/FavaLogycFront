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
  }

@Injectable()
export class TableComprobantesAprogramarService
{
    constructor(
        private _httpClient: HttpClient) { }

    getComprobantesSinRemitir( page, size, columna, order ): Observable<any> {

        //let ruta = `${BASE_URL}pedidos/pedidodetalle/sinremitir/comprobantes-sin-pedidos/${ page }/${ size }/${ columna }/${ order }`;
        let ruta = `${BASE_URL}pedidos/pedidodetalle/sinremitir`;

        return this._httpClient.get(ruta);
    }

    getComprobanteSinRemitir( busqueda, page, size, columna, order ): Observable<any> {

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`

        let ruta = `${BASE_URL}pedidos/pedidodetalle/sinremitir/comprobantes-sin-pedidos/${ busqueda }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }
}
