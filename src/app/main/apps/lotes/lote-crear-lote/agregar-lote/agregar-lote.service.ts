import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class LoteAgregarLoteService
{
    constructor(
        private _httpClient: HttpClient){
    }


    getCabecera(id): Observable<any> {   

        let ruta = `${BASE_URL}pedidos/pedidocabecera/${id}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDetalle(id, page, size, columna, order): Observable<any> {   
        let ruta = `${BASE_URL}pedidos/pedidodetalle/cabecera/${id}/${page}/${size}/${columna}/${order}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    postLote(listaIdPedidos: Array<number>, comentario: string): Observable<any>{
        
        let ruta = `${BASE_URL}pedidos/pedidolote/lote`

        let body =   {
            "listaIdPedidos": listaIdPedidos, 
            "comentario": comentario
        }
        
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        console.log(body)

        return this._httpClient.post(ruta,body,{headers:headers});
    }

}
