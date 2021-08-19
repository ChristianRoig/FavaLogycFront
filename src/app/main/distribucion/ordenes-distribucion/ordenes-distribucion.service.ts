import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class OrdenesDistribucionService
{
    constructor(
        private _httpClient: HttpClient
    ){    }

    getAllOrdenes(  page, size, columna, order ): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidos/distribucion/estado/NUEVO/${ page }/${ size }/${ columna }/${ order }`;

        return this._httpClient.get(ruta);
    } 
    
    getOrdenById ( idOrdenDist: number ): Observable<any>{    
        
        let ruta = `${ BASE_URL }pedidos/distribucion/${ idOrdenDist }`;
        return this._httpClient.get(ruta);
    }

    getOrdenByCupa ( cupa: number ): Observable<any>{    
        
        let ruta = `${ BASE_URL }pedidos/distribucion/cupa/${ cupa }`;
        return this._httpClient.get(ruta);
    }

}
