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
    idLote : number;
  }

@Injectable()
export class TableComprobantesService
{
    constructor(
        private _httpClient: HttpClient) { }

    getComprobantesConPedidos( body: BodyDetalle, page, size, columna, order ): Observable<any> {
        //console.log(columna,"|", order);
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        //getAll
        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ page }/${ size }/${ columna }/${ order }`; 

        return this._httpClient.post(ruta, body, {headers: headers});
    }

    getComprobanteConPedido( body: BodyDetalle, busqueda, page, size, columna, order ): Observable<any> {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`

        //getOne
        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ busqueda }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.post(ruta, body, {headers: headers});
    }
}
