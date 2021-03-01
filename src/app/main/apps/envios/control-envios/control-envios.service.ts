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
export class ControlEnviosService {
    arregloDeDetalles;
    idLote;
    modo;
    
    constructor( private _httpClient: HttpClient ) {}

    async getDetalleUnico( idLote, codArt, etapaproceso ): Promise<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

       console.log('idLote', idLote, "| etapaproceso", etapaproceso, "| codArt", codArt);
        let ruta = `${BASE_URL}pedidos/detalleunico/lote/${idLote}/${etapaproceso}/codbarras`;
        //let ruta = `${BASE_URL}pedidos/detalleunico/lote/${idLote}/${etapaproceso}/${codArt}`;
        //let ruta = `${BASE_URL}pedidos/detalleunico/lote/7/estanteria/a/codbarras`;
        /* /codBarras */
        
        return this._httpClient.get(ruta, {headers: headers})
		.toPromise().then ( (response: any) => {

			return response;	
		});
    }

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

    async getCupaCodBarras(cupa, idLote, codBarras, modo): Promise<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let pedidoparte = modo === 'darsena' ? '/pedidoparte' : '';

        let ruta = `${BASE_URL}pedidos${pedidoparte}/cupa/lote/codbarras/${cupa}/${idLote}/${codBarras}`;
        

        return this._httpClient.get(ruta, {headers: headers})
		.toPromise().then ( (response: any) => {

			return response;
			
		}, (err) => {
            
            return err;
            
        });
    }

    async eliminarArticuloDeLotePorCupa(cupa): Promise<any>
    {

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/pedidolote/cupa/${cupa}`;
        

        return this._httpClient.delete(ruta, {headers: headers})
		.toPromise().then ( (response: any) => {

			return response;
			
		}, (err) => {
            
            return err;
            
        });
    }
}
