import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosVisualizacionService
{
    constructor(
        private _httpClient: HttpClient
    ) { }


    getCabecera( id ): Observable<any> {   

        const ruta = `${BASE_URL}pedidos/pedidocabecera/${ id }`;

        return this._httpClient.get(ruta);
    }

    getArticulos( id, page, size, columna, order ): Observable<any> {   

        const ruta = `${BASE_URL}pedidos/pedidodetalle/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }

    getArticulosPedidos( id, page, size, columna, order ): Observable<any> {   

        const ruta = `${BASE_URL}pedidos/pedidodetalle/cabecera/${ id }/${ page }/${ size }/${ columna }/${ order }`;
        
        return this._httpClient.get(ruta);
    }

    getTrazabilidad(id, page, size, columna, order): Observable<any> {  

        const ruta = `${BASE_URL}pedidos/trazabilidad/gestion/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }

    getTrazabilidadPedidos(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/trazabilidad/gestion/pedidocabecera/${ id }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }

    getDatosEntrega(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/datosentrega/comprobante/${id}/${page}/${size}/${columna}/${order}`;
        
        return this._httpClient.get(ruta);
    }
    getDatosEntregaPedidos(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/datosentrega/cabecera/${id}/${page}/${size}/${columna}/${order}`;

        return this._httpClient.get(ruta);
    }

    getComprobantes(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/pedidocbte/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }
    
    getComprobantesPedidos(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/pedidocbte/cabecera/${ id }/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    }

    getCUPA(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/pedidoparte/comprobante/${id}/${page}/${size}/${columna}/${order}`;

        return this._httpClient.get(ruta);
    }

    getCUPAPedidos(id, page, size, columna, order): Observable<any> {   
        
        const ruta = `${BASE_URL}pedidos/pedidoparte/cabecera/${id}/${page}/${size}/${columna}/${order}`;

        return this._httpClient.get(ruta);
    }

    getImprimirCUPA( idPedidoDetalleParte: number ): Observable<any> {
    
        const ruta = `${ BASE_URL }pedidos/pedidolote/partearticulo/imprimir-cupa/${ idPedidoDetalleParte }`;
        return this._httpClient.get(ruta);
    }

    getListaDeNotificacionesPorCbte( nroCbte: string ): Observable<any> {
    
        const ruta = `${ BASE_URL }pedidos/novedad/por-comprobante/${ nroCbte }`;
        return this._httpClient.get(ruta);
    }

    marcarNotificacionComoLeido( idNovedad: number, body: {} ){

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'            
        });

        const ruta = `${ BASE_URL }pedidos/novedad/${ idNovedad }`;

        return this._httpClient.put(ruta, body, { headers: headers });
    }
    
}
