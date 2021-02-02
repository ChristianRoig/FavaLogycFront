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

    async getDetalleUnico(idLote, codArt, etapaproceso): Promise<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
       console.log(idLote, etapaproceso, codArt);
        let ruta = `${BASE_URL}pedidosatrabajar/detalleunico/lote/${idLote}/${etapaproceso}/codbarras`;
        //let ruta = `${BASE_URL}pedidosatrabajar/detalleunico/lote/${idLote}/${etapaproceso}/${codArt}`;
        //let ruta = `${BASE_URL}pedidosatrabajar/detalleunico/lote/7/estanteria/a/codbarras`;
        /* /codBarras */
        
        return this._httpClient.get(ruta, {headers: headers})
		.toPromise().then ( (response: any) => {

			return response;
			
		});
    }


    async getCupaCodBarras(cupa, idLote, codBarras, modo): Promise<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let pedidoparte = modo === 'darsena' ? '/pedidoparte' : '';

        let ruta = `${BASE_URL}pedidosatrabajar${pedidoparte}/cupa/lote/codbarras/${cupa}/${idLote}/${codBarras}`;
        

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

        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/cupa/${cupa}`;
        

        return this._httpClient.delete(ruta, {headers: headers})
		.toPromise().then ( (response: any) => {

			return response;
			
		}, (err) => {
            
            return err;
            
        });
    }
}
