import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

const BASE_URL = environment.server + environment.baseUrl;

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

  postEliminarRemitoDeOrden( listaIdRemitos ): Observable<any>{  // REVISAR

    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    console.log( listaIdRemitos );
    let body = { "listaId" :  listaIdRemitos  } 

    console.log( body );
    
    let ruta = `${BASE_URL}pedidos/distribucion/remito`;    
    return this._httpClient.post( ruta, body,{ headers: headers });
  }

  getOrdenById ( idOrdenDist: number ): Observable<any>{    
        
    let ruta = `${ BASE_URL }pedidos/distribucion/${ idOrdenDist }`;
    return this._httpClient.get(ruta);
}

  getRemitoPorId( idRemito: number ){
    let ruta = `${BASE_URL}pedidos/pedidocbte/remito/por-idremito/${ idRemito }`;
      return this._httpClient.get(ruta);
  }

  eliminarOrdenDeDistribucion( idOrden ): Observable<any> {

    let headers = new HttpHeaders({
        "Content-Type": "application/json"
    });
    
    let ruta = `${BASE_URL}pedidos/distribucion/${ idOrden }`;

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

  getImprimirOrdenDist(idOrdenDist: number){
    
    let ruta = `${ BASE_URL }pedidos/distribucion/imprimir-distribucion/${ idOrdenDist }`;
    return this._httpClient.get(ruta);
  }
}

