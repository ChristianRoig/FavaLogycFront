import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraAddService
{
    constructor(
        private _httpClient: HttpClient
    ){}

    getCodigoBarra(codArt): Observable<any>
    {
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/porcodigoarticuloonombre/${codArt}/0/1/id`;
        return this._httpClient.get(ruta);
    }

    postCodigoBarra(id:number, codigoDeBarra:string, descripcion: string): Observable<any>
    {
        
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra`

        let body=   {
            codigoDeBarra: codigoDeBarra,
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
