import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraArticulosService implements Resolve<any>
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onPartesArticuloChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getPartesArticulos2()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getPartesArticulos2(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/porcodigoonombre/MPLA/0/15/id')
                .subscribe((response: any) => {
                    this.partesArticulo = response;
                    this.onPartesArticuloChanged.next(this.partesArticulo);
                    resolve(response);
                }, reject);
        });
    }

    getArticulos(): Observable<any>
    {

        return this._httpClient.get('http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/porcodigoarticuloonombre/Somm/0/20/id');
    }
}
