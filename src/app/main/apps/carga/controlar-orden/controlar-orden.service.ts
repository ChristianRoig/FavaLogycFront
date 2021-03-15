import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable({
  providedIn: 'root'
}) 

export class ControlarOrdenService{
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
  getArticulosDeRemitosDeOrdenDistribucion( idOrdenDist ): Observable<any>{
    let ruta = `${BASE_URL}pedidos/distribucion/${ idOrdenDist }`;
    return this._httpClient.get(ruta);
  }

  controlarArticuloPorCupa( idOrdenDist: number, cupa: number ): Observable<any>{
    let ruta = `${BASE_URL}pedidos/distribucion/cupa/${ idOrdenDist }/${ cupa }`;
    return this._httpClient.get(ruta);
  }
}
