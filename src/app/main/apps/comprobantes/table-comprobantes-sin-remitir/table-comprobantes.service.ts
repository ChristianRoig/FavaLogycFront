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
export class TableComprobantesSinRemitirService
{
    constructor(
        private _httpClient: HttpClient) { }

    getPedidosDetalles( body: BodyDetalle, busqueda, page, size, columna, order ): Observable<any> {

        columna = 'idCbte';
        order = 'desc';

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar: string = '';
        if ( busqueda !== '' )
            buscar = `/${busqueda}`
        
        console.log(columna);

        //getOne?
        //let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobantes-con-pedidos/${ comprobante }/${ page }/${ size }/${ sortBy }/${ order }`;
        let ruta = `${BASE_URL}pedidos/pedidodetalle/sinremitir/comprobantes-sin-pedidos/A0006/0/11/nroCbte/asc`;
        //getAll 
        //let ruta = `http://localhost:3000/datos`; 

        return this._httpClient.get(ruta);
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
