import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosCodigosBarraEditarService
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    ){}
    

    getCodigoBarra(id): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/codigodebarras/${id}`;
        return this._httpClient.get(ruta);
    }

    putCodigoBarra(id:number, codigoDeBarras:string, descripcion: string): Observable<any>
    {
        
        let ruta = `${BASE_URL}pedidosatrabajar/codigodebarras/${id}`

        let body=  {
            codigoDeBarras: codigoDeBarras,
            descripcion: descripcion
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.put(ruta,body,{headers:headers});
    }

}
