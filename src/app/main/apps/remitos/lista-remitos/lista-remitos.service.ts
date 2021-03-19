import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { observeOn } from 'rxjs/operators';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyDetalle{
    
    idTipo : number;
    idTurno : number;
    idOrigen : number;
    idEtapa : number;
    idProvincia : number;
    idLocalidad : number;
    desdePedido : string;
    hastaPedido : string;
    idLote : number;
}

@Injectable()
export class ListaRemitosService
{
    constructor(
        private _httpClient: HttpClient
    ){    }
    
    getRemitosSinDistribucion(page, size, columna, order): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidos/pedidocbte/remito/a-distribuir/${ page }/${ size }/${ columna }/${ order }`;
        return this._httpClient.get(ruta);
    }
    
    getRemitoPorId( idRemito: number ){
        let ruta = `${BASE_URL}pedidos/pedidocbte/remito/por-idremito/${ idRemito }`;
        return this._httpClient.get(ruta);
    }

  

    

}
