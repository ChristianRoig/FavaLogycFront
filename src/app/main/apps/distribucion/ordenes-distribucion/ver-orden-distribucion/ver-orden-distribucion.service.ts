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

export class VerOrdenDistribucionService {
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
  getRemitosDeOrdenDistribucion( idOrdenDist ): Observable<any>{
      let ruta = `${BASE_URL}pedidos/distribucion/${ idOrdenDist }`;
      return this._httpClient.get(ruta);
  }

  postEliminarArticuloDeLote( listaIdPedidoDetalle ): Observable<any>{

      let headers = new HttpHeaders({
          "Content-Type": "application/json"
      });

      let body= {
          listaIdPedidoDetalle: listaIdPedidoDetalle
      }

      let ruta = `${BASE_URL}pedidos/pedidolote/lote/detalle/`;

      console.log(listaIdPedidoDetalle);

      return this._httpClient.post(ruta, body, {headers: headers});
  }

  imprimir(lote, impresora): Observable<any>{

    let headers = new HttpHeaders({
        "Content-Type": "application/json"
    });
    
    let ruta = `${BASE_URL}pedidos/pedidolote/lote/imprimir/cupa/${lote}/${impresora}`;
    return this._httpClient.post(ruta, {headers: headers});
  }

  eliminarOrdenDeDistribucion( idOrden ): Observable<any> {

    let headers = new HttpHeaders({
        "Content-Type": "application/json"
    });

    let body= {}
    
    let ruta = `${BASE_URL}pedidos/distribucion/${ idOrden }`;

    //return this._httpClient.delete(ruta);
    return this._httpClient.delete(ruta, {headers: headers});
  }

  updateNombreLote(nombre, idLote){
    
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    let body = {
      "nombre": nombre,
    }

    let ruta = `${BASE_URL}pedidos/pedidolote/lote/${ idLote }`;
    return this._httpClient.put(ruta, body,{headers: headers});
  }
  
  addRemitosAorden( idRemito ,idOrden ){
    
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    let body = {
      "listaId" : [ idRemito ]
    }

    let ruta = `${BASE_URL}pedidos/distribucion/${ idOrden }`;
    return this._httpClient.post(ruta, body, {headers: headers});
  }

  getRemitosSinDistribucion(page, size, columna, order): Observable<any>{  
        
    let ruta = `${ BASE_URL }pedidos/pedidocbte/remito/a-distribuir/${ page }/${ size }/${ columna }/${ order }`;
    return this._httpClient.get(ruta);
  }

}

