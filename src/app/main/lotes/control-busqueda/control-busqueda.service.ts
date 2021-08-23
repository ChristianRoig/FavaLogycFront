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
export class ControlBusquedaService
{
    arregloDeDetalles;
    idLote;
    modo;
    
    constructor( private _httpClient: HttpClient ) {}


    getLotesPorEstado(estado: string, page, size): Observable<any>{  
        let ruta = `${ BASE_URL }pedidos/pedidolote/lote/v2/${ estado }/${ page }/${ size }`;
        return this._httpClient.get(ruta);
    }

    getDetalleLotePorCupa ( cupa, etapa ): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidos/detalleunico/cupa/${ cupa }/${ etapa }`;
        return this._httpClient.get(ruta);
    }

    getLotePorNombre(lote: any, body): Observable<any>{

        let headers = new HttpHeaders({ "Content-Type": "application/json" });
    
        let ruta = `${BASE_URL}pedidos/pedidolote/pornombreyfechas/${lote}`;
        
        return this._httpClient.post(ruta, body, {headers: headers});
    } 

    getLotePorId( id: number ){

        let ruta = `${ BASE_URL }pedidos/pedidolote/${ id }`;
        return this._httpClient.get(ruta);
    }
}
