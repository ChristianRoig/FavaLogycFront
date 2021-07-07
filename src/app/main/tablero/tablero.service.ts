import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class TableroService {
    /* projects: any[];
    widgets: any[]; */
    

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

    getResumen( ): Observable<any> {

        let ruta = `${ BASE_URL }pedidos/resumen/SALON`;
        
        return this._httpClient.get(ruta);
    }
    
}
