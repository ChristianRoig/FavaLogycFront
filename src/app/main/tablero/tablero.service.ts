import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class TableroService {
    /* projects: any[];
    widgets: any[]; */
    
    headers = new HttpHeaders();
    token: string;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) { }

    getResumen( token: string ): Observable<any> {
        
        let headers = new HttpHeaders({
            'Content-Type' : 'application/json; charset=utf-8',
            'Accept'       : 'application/json',
            'Authorization': token
        });
   
        let ruta = `${ BASE_URL }pedidos/resumen`;
        
        return this._httpClient.get(ruta, {headers: headers} );
        //return this._httpClient.post(ruta, null,{headers: headers});
    }

    
}
