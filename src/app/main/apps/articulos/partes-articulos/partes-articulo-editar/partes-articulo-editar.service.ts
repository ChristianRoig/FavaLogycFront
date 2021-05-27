import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosPartesArticulosEditarService
{
    constructor(
        private _httpClient: HttpClient ){}

    /**
     * Devuelve un Artículo por id
     * @param id: number
     */
    getArticulo(id): Observable<any> {

        return this._httpClient.get(`${BASE_URL}pedidos/articulo/${id}`);
    }


    /**
     * Actualiza la CANTIDAD de un artículo
     * @param id: number
     * @param cantidad: number ( nueva cantidad )
     */
    putArticulo( id: number, body ): Observable<any> {
/* 
        let body = {
            cantidad: cantidad
        } */

        
        let ruta = `${BASE_URL}pedidos/articulo/${id}`
        
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        console.log( " EL ID",  id  );
        console.log( "THE body",  body  );
        
        return this._httpClient.put( ruta, body, { headers: headers } );
    }
}
