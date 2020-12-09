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
  getLotes(lote): Observable<any>
  {
      let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/${lote}`;
      return this._httpClient.get(ruta);
  }

  getLotesPorFecha(body: BodyDetalle, lote): Observable<any>
    {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/pornombreyfechas/${lote}`;
        

        return this._httpClient.post(ruta, body, {headers: headers});
    }
}

