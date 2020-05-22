import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';


const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosPartesArticulosEditarService
{
    partesArticulo: any[];
    onPartesArticuloChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient ){}

    getPartesArticulos(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${BASE_URL}pedidosatrabajar/articuloparte/porcodigoonombre/MPLA/0/15/id`)
                .subscribe((response: any) => {
                    return this.partesArticulo = response;
                }, reject);
        });
    }

    /**
     * Devuelve un Artículo por id
     * @param id: number
     */
    getArticulo(id): Observable<any>
    {
        return this._httpClient.get(`${BASE_URL}pedidosatrabajar/articuloparte/${id}`);
    }


    /**
     * Actualiza la CANTIDAD de un artículo
     * @param id: number
     * @param cantidad: number ( nueva cantidad )
     */
    putArticulo( id:number, cantidad: number): Observable<any>
    {
        let body= {
            cantidad: cantidad
        }

        let ruta = `${BASE_URL}pedidosatrabajar/articuloparte/${id}`
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.put(ruta,body,{headers:headers});
    }
}
