import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosPartesArticulosEditarService
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    ){}

    getPartesArticulos(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/porcodigoonombre/MPLA/0/15/id')
                .subscribe((response: any) => {
                    return this.partesArticulo = response;
                }, reject);
        });
    }

    getArticulo(id): Observable<any>
    {
        return this._httpClient.get(`http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/${id}`);
    }

    putArticulo(id:number, cantidad): Observable<any>
    {
        let body= {
            cantidad: cantidad
        }

        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/${id}`
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.put(ruta,body,{headers:headers});
    }
}
