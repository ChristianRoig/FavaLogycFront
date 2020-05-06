import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PedidosCodigosBarraService implements Resolve<any>
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
                this.getPartesArticulos()
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
    getPartesArticulos(): Promise<any>
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

    getCodigosBarra(codArticulo): Observable<any>
    {
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/porcodigoarticuloonombre/${codArticulo}/0/7/id`;
        return this._httpClient.get(ruta);
    }

    getCodigoBarra(codArticulo): Observable<any>
    {
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/porcodigodebarraodescripcion/${codArticulo}/0/10/id`;
        return this._httpClient.get(ruta);
    }

    deleteCodigoBarra(id): Observable<any>
    {
        let ruta = `http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/codigodebarra/${id}`;
        return this._httpClient.delete(ruta);
    }
}
