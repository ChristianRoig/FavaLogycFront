import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosAgregarPedido1Service
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getCabecera(id): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidosatrabajar/pedidocabecera/${id}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    getDetalle(tipoPedido: number, cbte: string): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/sinremitir/${tipoPedido}/${cbte}`;
        // let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/sinremitir/${tipoPedido}/B0008800024195`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

}
