import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraAddService
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    ){}

    getCodigoBarra(id): Observable<any>
    {
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/${id}`;
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

        return this._httpClient.put(ruta,body,{headers:headers});
    }
}
