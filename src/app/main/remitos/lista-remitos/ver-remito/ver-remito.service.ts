import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class VerRemitoService {
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

  getRemitoPorId( idRemito: number ){
    let ruta = `${BASE_URL}pedidos/pedidocbte/remito/por-idremito/${ idRemito }`;
      return this._httpClient.get(ruta);
  }

  getImprimirRemito( idComprobante: number ){
    
    let ruta = `${ BASE_URL }pedidos/pedidocbte/imprimir-remito/${ idComprobante }`;
    return this._httpClient.get(ruta);

  }
}



