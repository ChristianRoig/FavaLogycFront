import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BuscarLoteService 
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
  getPartesArticulos(lote): Observable<any>
  {

      let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/${lote}`;
      return this._httpClient.get(ruta);
  }
}

