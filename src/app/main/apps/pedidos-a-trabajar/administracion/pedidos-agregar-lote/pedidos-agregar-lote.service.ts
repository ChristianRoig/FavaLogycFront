import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosAgregarLoteService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getCabecera(id): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidosatrabajar/pedidocabecera/${id}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDetalle(id, page, size, columna, order): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/cabecera/${id}/${page}/${size}/${columna}/${order}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    postLote(listaIdPedidos: Array<number>, fechaCreacion: string, comentario: string): Observable<any>
    {
        
        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/lote/`

        let body=   {
            "listaIdPedidos": listaIdPedidos,
            "fechaCreacion": fechaCreacion,
            "comentario": comentario
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        console.log(body)

        return this._httpClient.post(ruta,body,{headers:headers});
    }

}
