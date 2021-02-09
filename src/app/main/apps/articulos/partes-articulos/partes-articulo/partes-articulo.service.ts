import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosPartesArticulosService
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
    getPartesArticulos(search, page, size, columna, order): Observable<any>{
        
        let busqueda = "";
        if(search != ""){
            busqueda = `/${search}`
        }

        let ruta = `${BASE_URL}pedidos/articuloparte/porcodigoonombre${busqueda}/${page}/${size}/${columna}/${order}`;
        return this._httpClient.get(ruta);
    }
}
