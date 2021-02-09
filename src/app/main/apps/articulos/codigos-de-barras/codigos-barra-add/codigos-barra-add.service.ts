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

    getCodigoBarra(codArt): Observable<any>
    {
        let ruta = `${BASE_URL}pedidos/codigodebarras/porcodigoarticuloonombre/${codArt}/0/1/id/asc`;
        return this._httpClient.get(ruta);
    }

    postCodigoBarra(id:number, codigoDeBarras:string, descripcion: string): Observable<any>
    {
        
        let ruta = `${BASE_URL}pedidos/codigodebarras`

        let body=   {
            codigoDeBarras: codigoDeBarras,
            descripcion: descripcion,
            sysUsuario: {
                id: 1
            },
            articulo: {
                id: id
            }
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.post(ruta,body,{headers:headers});
    }
}
