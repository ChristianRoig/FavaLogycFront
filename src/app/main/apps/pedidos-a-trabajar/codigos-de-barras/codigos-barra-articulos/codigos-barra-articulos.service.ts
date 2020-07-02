import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosCodigosBarraArticulosService
{
    constructor(
        private _httpClient: HttpClient
    )
    {    }


    getArticulos(busqueda, page, size, columna, order): Observable<any>
    {
        let search = ""

        if(busqueda != ""){
            search = `/${busqueda}`
        }   
        return this._httpClient.get(`${BASE_URL}pedidosatrabajar/codigodebarras/porcodigoarticuloonombre${search}/${page}/${size}/${columna}/${order}`);
    }
}
