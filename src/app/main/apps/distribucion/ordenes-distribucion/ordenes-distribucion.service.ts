import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { observeOn } from 'rxjs/operators';
//import { BodyDetalleFecha } from './ordenes-distribucion.component';

const BASE_URL = environment.server + environment.baseUrl;

/* export interface BodyDetalle{
    
    idTipo : number;
    idTurno : number;
    idOrigen : number;
    idEtapa : number;
    idProvincia : number;
    idLocalidad : number;
    desdePedido : string;
    hastaPedido : string;
    idLote : number;
} */

@Injectable()
export class OrdenesDistribucionService
{
    constructor(
        private _httpClient: HttpClient
    ){    }

    getAllOrdenes(  page, size, columna, order ): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidos/distribucion/estado/NUEVO/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    } // pedidos / distribucion / :pageNo / :pageSize / :soryBy / :order
    
    getOrdenById ( idOrdenDist: number ): Observable<any>{    
        
        let ruta = `${ BASE_URL }pedidos/distribucion/${ idOrdenDist }`;
        return this._httpClient.get(ruta);
    }
    
    /* eliminarOrden ( idOrdenDist: number ): Observable<any>{    
        
        let ruta = `${ BASE_URL }pedidos/distribucion/${ idOrdenDist }`;
        return this._httpClient.get(ruta);
    } */

}
