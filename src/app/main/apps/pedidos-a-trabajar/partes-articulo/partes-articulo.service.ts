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
    getPartesArticulos(page, size, order): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/articuloparte/porcodigoonombre/MPLA/${page}/${size}/${order}`;
        return this._httpClient.get(ruta);
    }

    /**
     * Devuelve Partes de Artículos
     * @returns {Promise} Promise
     */
    searchPartesArticulos(search, page, size, order)
    {
        let ruta = `${BASE_URL}pedidosatrabajar/articuloparte/porcodigoonombre/${search}/${page}/${size}/${order}`;
        return this._httpClient.get(ruta).toPromise();
    }
}
