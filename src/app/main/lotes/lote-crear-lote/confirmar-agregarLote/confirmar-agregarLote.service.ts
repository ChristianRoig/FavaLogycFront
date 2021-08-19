import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

export interface BodyRemito {
    idTransporte: number,
    idDeposito: number,
    idTalonario: number,
    listaIdDetalle: number []
  }

@Injectable()
export class ConfirmarAgregarLoteService {
    constructor(
        private _httpClient: HttpClient) { }

    postLote(listaIdPedidos: Array<number>, comentario: string): Observable<any>{
        
        let ruta = `${BASE_URL}pedidos/pedidolote/lote`;

        let body =   {
            "listaIdPedidos": listaIdPedidos, 
            "comentario": comentario
        }
        
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        console.log(body)

        return this._httpClient.post(ruta,body,{headers:headers});
    }

    getLote( id: number ): Observable<any> {

        let ruta = `${BASE_URL}pedidos/pedidoetapa/estado/${id}`;
        return this._httpClient.get(ruta);
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

    
}