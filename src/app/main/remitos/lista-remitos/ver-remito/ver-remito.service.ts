import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getImprimirRemito( body: any ){
    console.log("BODYYY", body );  
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let ruta = `${ BASE_URL }pedidos/pedidocbte/imprimir-remito`;

    return this._httpClient.post(ruta, body, {headers: headers});

  }
}



