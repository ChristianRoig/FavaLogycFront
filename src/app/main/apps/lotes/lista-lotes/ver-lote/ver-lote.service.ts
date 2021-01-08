import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

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

@Injectable({
  providedIn: 'root'
})

export class VerLoteService {
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor( private _httpClient: HttpClient ) { }

  /**
   * Devuelve Partes de Artículos
   * @returns {Observable} Observable
   */
  getLote(loteId: number): Observable<any>{

      let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/${ loteId }`;
      return this._httpClient.get(ruta);
  }

  postEliminarArticuloDeLote( listaIdPedidoDetalle ): Observable<any>{

      let headers = new HttpHeaders({
          "Content-Type": "application/json"
      });

      let body= {
          listaIdPedidoDetalle: listaIdPedidoDetalle
      }

      let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/lote/detalle/`;

      console.log(listaIdPedidoDetalle);

      return this._httpClient.post(ruta, body, {headers: headers});
  }

  postEliminarLote(  ): Observable<any> {

    let headers = new HttpHeaders({
        "Content-Type": "application/json"
    });

    let body= {
        
    }
    let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/lote/detalle/`;

    return this._httpClient.post(ruta, body, {headers: headers});
}

  getPedidosLote(body: BodyDetalle, busqueda, columna, order): Observable<any>{
        
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
  /* updateNombreLote(nombre, lote){
    
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    let body = {
      "id": lote.id,
      "nombre": nombre,
      "fechaAlta": lote.fechaAlta
    }

    let ruta = `${BASE_URL}pedidosatrabajar/pedidolote/lote/imprimir/cupa/${ lote }`;
    return this._httpClient.put(ruta, body,{headers: headers});
  } */

}

