import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class RemitosConfirmarService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    getAllTalonarios(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/talonario/tipopedido/1`;
        return this._httpClient.get(ruta);
    }

    getAllTransportes(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/transporte/`;
        return this._httpClient.get(ruta);
    }

    getAllDepostitosCarga(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/deposito/`;
        return this._httpClient.get(ruta);
    }

    getUltimoNroCbte(id){
        let ruta = `${BASE_URL}pedidosatrabajar/talonario/${id}`;
        return this._httpClient.get(ruta);
    }

}
