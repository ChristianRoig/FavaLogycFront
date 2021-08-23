import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosCodigosBarraAddService
{
    constructor(
        private _httpClient: HttpClient
    ){}

    getCodigoBarra(codArt, page, size, columna, order): Observable<any> {
        //let ruta = `${BASE_URL}pedidos/codigodebarras/porcodigoarticuloonombre/${codArt}/0/1/id/asc`;
        let ruta = `${BASE_URL}pedidos/codigodebarras/porcodigoarticuloonombre/${codArt}/${page}/${size}/${columna}/${order}`;
        return this._httpClient.get(ruta);
    }

    postCodigoBarra( body: {} ): Observable<any> {
        
        let ruta = `${BASE_URL}pedidos/codigodebarras`

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        console.log("body", body);
        return this._httpClient.post(ruta,body,{headers:headers});
    }
}
