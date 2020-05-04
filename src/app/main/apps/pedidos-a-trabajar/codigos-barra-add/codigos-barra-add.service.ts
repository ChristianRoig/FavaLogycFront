import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraAddService
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient
    ){}

    getPartesArticulos(): Promise<any>
    {
        console.log("entre al servicio");
        return new Promise((resolve, reject) => {
            console.log("entre al servicio2");
            this._httpClient.get('http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/porcodigoonombre/MPLA/0/15/id')
                .subscribe((response: any) => {
                    return this.partesArticulo = response;
                }, reject);
        });
    }
}
