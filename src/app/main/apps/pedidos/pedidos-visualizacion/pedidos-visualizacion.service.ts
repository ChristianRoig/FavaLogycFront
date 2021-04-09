import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosVisualizacionService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getCabecera( id ): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidos/pedidocabecera/${ id }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDetalle(id, page, size, columna, order): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidos/pedidodetalle/cabecera/${id}/${page}/${size}/${columna}/${order}`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getTrazabilidad(id, page, size, columna, order): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidos/trazabilidad/gestion/pedidocabecera/${id}/${page}/${size}/${columna}/${order}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDatosEntrega(id, page, size, columna, order): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidos/datosentrega/cabecera/${id}/${page}/${size}/${columna}/${order}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    
    }

    getComprobantes(id, page, size, columna, order): Observable<any> {   
        let ruta = `${BASE_URL}pedidos/pedidocbte/cabecera/${ id }/${ page }/${ size }/${ columna }/${ order }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getCUPA(id, page, size, columna, order): Observable<any> {   
        let ruta = `${BASE_URL}pedidos/pedidoparte/cabecera/${id}/${page}/${size}/${columna}/${order}`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }
    
}
