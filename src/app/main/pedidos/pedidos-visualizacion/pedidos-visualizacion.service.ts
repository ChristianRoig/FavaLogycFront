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


    getCabecera( id ): Observable<any> {   
        //pedidos/pedidocabecera/${ id }
        //pedidos/pedidodetalle/comprobante/${ id }/${page}/${size}/${columna}/${order}
        let ruta = `${BASE_URL}pedidos/pedidocabecera/${ id }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getArticulos(id, page, size, columna, order): Observable<any> {   

        let ruta = `${BASE_URL}pedidos/pedidodetalle/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getTrazabilidad(id, page, size, columna, order): Observable<any>
    {   //pedidos/trazabilidad/gestion/comprobante - NUEVO
        //pedidos/trazabilidad/gestion/pedidocabecera - VIEJO
        let ruta = `${BASE_URL}pedidos/trazabilidad/gestion/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDatosEntrega(id, page, size, columna, order): Observable<any>
    {   //pedidos/datosentrega/comprobante
        let ruta = `${BASE_URL}pedidos/datosentrega/comprobante/${id}/${page}/${size}/${columna}/${order}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    
    }

    getComprobantes(id, page, size, columna, order): Observable<any> {   
        let ruta = `${BASE_URL}pedidos/pedidocbte/comprobante/${ id }/${ page }/${ size }/${ columna }/${ order }`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getCUPA(id, page, size, columna, order): Observable<any> {   
        let ruta = `${BASE_URL}pedidos/pedidoparte/comprobante/${id}/${page}/${size}/${columna}/${order}`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getImprimirCUPA( idPedidoDetalleParte: number ): Observable<any>{
    
        let ruta = `${ BASE_URL }pedidos/pedidolote/partearticulo/imprimir-cupa/${ idPedidoDetalleParte }`;
        return this._httpClient.get(ruta);
      }
    
}
