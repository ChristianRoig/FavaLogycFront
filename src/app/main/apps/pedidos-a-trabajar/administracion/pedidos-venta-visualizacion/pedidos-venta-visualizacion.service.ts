import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosVentaVisualizacionService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getCabecera(id): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidosatrabajar/pedidocbte/detalle/${id}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDetalle(id): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/cabecera/${id}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

}
