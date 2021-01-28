import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { observeOn } from 'rxjs/operators';
import { BodyDetalleFecha } from './lista-lotes.component';

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
export class ListaLotesService
{
    constructor(
        private _httpClient: HttpClient
    ){    }

    getAllLotes( page, size ): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidosatrabajar/pedidolote/lote/${ page }/${ size }`;
        //let ruta = `${ BASE_URL }pedidosatrabajar/pedidolote/lote/0/10`;
        return this._httpClient.get(ruta);
    }
    
    getLotesPorNombre( nombreLote ): Observable<any>{    
        
        let ruta = `${ BASE_URL }pedidosatrabajar/pedidolote/lote/nombre/${ nombreLote }`;
        return this._httpClient.get(ruta);
    }
    
    getLotesPorEstado(estado: string, page, size): Observable<any>{  
        
        let ruta = `${ BASE_URL }pedidosatrabajar/pedidolote/lote/${ estado }/${ page }/${ size }`;
        return this._httpClient.get(ruta);
    }

    getLotePorId(loteId: number): Observable<any>{                       //PROPUESTA

        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/${ loteId }`;
        return this._httpClient.get(ruta);
    }

    getAllEtapasPorId(id: number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoetapa/estado/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllEtapas(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoetapa/`;
        return this._httpClient.get(ruta);
    }

    getAllTurnos(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoturno/`;
        return this._httpClient.get(ruta);
    }

    getAllTransportes(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/transporte/`;
        return this._httpClient.get(ruta);
    }

    getAllEstadosPorId(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoestado/etapa/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllEstados(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoestado/`;
        return this._httpClient.get(ruta);
    }

    getAllOrigenes(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidoorigen/`;
        return this._httpClient.get(ruta);
    }

    getAllTipos(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/pedidotipo/`;
        return this._httpClient.get(ruta);
    }

    getAllLocalidades(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/localidad/domicilio/`;
        return this._httpClient.get(ruta);
    }

    getAllLocalidadesPorProvincia(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/localidad/domicilio/provincia/${id}`;
        return this._httpClient.get(ruta);
    }

    getAllProvincias(): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/provincia/domicilio/`;
        return this._httpClient.get(ruta);
    }

    getProvinciaPorLocalidad(id:number): Observable<any>
    {
        let ruta = `${BASE_URL}pedidosatrabajar/provincia/localidad/${id}`;
        return this._httpClient.get(ruta);
    }

    getPedidosLote(body: BodyDetalle, busqueda, columna, order): Observable<any>{ //este se va
        
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        let buscar:string = '';
        if (busqueda !== '')
            buscar = `/${busqueda}`

        let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/pedidolote/porcomprobanteoarticulo${buscar}/${columna}/${order}`;
        
        return this._httpClient.post(ruta, body, {headers: headers});
    }

    imprimir(lote, impresora): Observable<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    
        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/lote/imprimir/cupa/${lote}/${impresora}`;
        return this._httpClient.post(ruta, {headers: headers});
    } 

    getLotesPorFecha(lote: any, body: BodyDetalleFecha): Observable<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
    
        let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/pornombreyfechas/${lote}`;
        
        return this._httpClient.post(ruta, body, {headers: headers});
    }    

}
