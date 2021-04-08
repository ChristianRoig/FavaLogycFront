import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

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

@Injectable({
  providedIn: 'root'
})

export class VerComprobanteService {
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor( private _httpClient: HttpClient ) { }

  /**
   * Devuelve Partes de Artículos
   * @returns {Observable} Observable
   */

  getPedidosDeComprobante( body, nroComprobante, page, size, columna, order ): Observable<any>{

      let headers = new HttpHeaders({
          "Content-Type": "application/json"
      });
      console.log("datassss", nroComprobante, page, size, columna, order);
      let ruta = `${BASE_URL}pedidos/pedidodetalle/${ nroComprobante }/${ page }/${ size }/${ columna }/${ order }`;
      //let ruta = `${BASE_URL}pedidos/pedidodetalle/B0006600086770/0/10/idDetalle/asc`;

      return this._httpClient.post(ruta, body, {headers: headers});
  }

}

