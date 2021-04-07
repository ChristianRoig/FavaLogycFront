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


    
/* ----------------------------------------------------------------------------------------------------------------------- */
    getProjects( ): Observable<any> {
        console.log("llegue al service");
        let ruta = `http://localhost:3000/proyectos`; 
    
        return this._httpClient.get(ruta);
    }

    getWidgets( ): Observable<any> {

    let ruta = `http://localhost:3000/resumenes`; 
    //let ruta = `${ BASE_URL }pedidos/resumen/2021-03-15/SALON/${ fecha }/${ lugar }`;
    
    return this._httpClient.get(ruta);
    }

    getResumen( ): Observable<any> {

    //let ruta = `http://localhost:3000/resumen`; 
    //let ruta = `http://localhost:3000/resumenes`; 
    let ruta = `${ BASE_URL }pedidos/resumen/SALON`;
    
    return this._httpClient.get(ruta);
    }
/* ----------------------------------------------------------------------------------------------------------------------- */
    
}
