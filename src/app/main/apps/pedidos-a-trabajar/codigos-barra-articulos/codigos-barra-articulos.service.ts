import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraArticulosService
{
    constructor(
        private _httpClient: HttpClient
    )
    {    }


    getArticulos(page,size,order): Observable<any>
    {
        return this._httpClient.get(`http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/porcodigoarticuloonombre/Somm/${page}/${size}/${order}`);
    }
}
