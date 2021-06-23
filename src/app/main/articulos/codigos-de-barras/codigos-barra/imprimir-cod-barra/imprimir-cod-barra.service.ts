import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;


@Injectable()
export class ImprimirCodBarraService {
    constructor(
        private _httpClient: HttpClient) { }

    getImprimirCodBarra( idArticulo: number, cant: number ): Observable<any>{

        let ruta = `${ BASE_URL }pedidos/codigodebarras/imprimir-codigobarras/${ idArticulo }/${ cant }`;
        return this._httpClient.get(ruta);

    }

    getCodigoBarra( idArticulo: number ): Observable<any>{

        let ruta = `${BASE_URL}pedidos/codigodebarras/${ idArticulo }`;
        return this._httpClient.get(ruta);

    }
}