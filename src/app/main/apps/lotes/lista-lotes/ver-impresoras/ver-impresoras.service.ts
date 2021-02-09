import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyDetalle{

  desdeLote : string;
  hastaLote : string;
}

@Injectable({
  providedIn: 'root'
})
export class VerImpresorasService 
{
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
  getImpresoras(): Observable<any>
  {
      let ruta = `${BASE_URL}pedidos/impresora/disponibles/`;
      return this._httpClient.get(ruta);
  }

  

}