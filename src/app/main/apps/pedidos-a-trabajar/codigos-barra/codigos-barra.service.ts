import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosCodigosBarraService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    getCodigosBarra(codArticulo, busqueda, page, size, columna, order): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/codigodebarras/porarticuloycodigodebarrasodescripcion/${codArticulo}/${busqueda}/${page}/${size}/${columna}/${order}`;
        console.log(ruta);
        return this._httpClient.get(ruta);
    }

    deleteCodigoBarra(id): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/codigodebarras/${id}`;
        return this._httpClient.delete(ruta);
    }
}
