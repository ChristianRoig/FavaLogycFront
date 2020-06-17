import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosListaService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getAllEtapasPorId(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoetapa/estado/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllEtapas(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoetapa/`;
        return this._httpClient.get(ruta);
    }

    getAllTurnos(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoturno/`;
        return this._httpClient.get(ruta);
    }

    getAllEstadosPorId(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoestado/etapa/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllEstados(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoestado/`;
        return this._httpClient.get(ruta);
    }

    getAllOrigenes(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoorigen/`;
        return this._httpClient.get(ruta);
    }

    getAllTipos(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidotipo/`;
        return this._httpClient.get(ruta);
    }

    getAllLocalidades(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/localidad/`;
        return this._httpClient.get(ruta);
    }

    getAllLocalidadesPorProvincia(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidotipo/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllProvincias(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/localidad/provincia/`;
        return this._httpClient.get(ruta);
    }

}
