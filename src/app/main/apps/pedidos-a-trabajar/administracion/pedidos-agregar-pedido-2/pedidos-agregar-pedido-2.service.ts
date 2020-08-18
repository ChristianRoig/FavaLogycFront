import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosAgregarPedido2Service
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }


    getDatosDeEntregaUpd(cabecera: number): Observable<any>
    {   

        let ruta = `${BASE_URL}pedidosatrabajar/datosentrega/cabecera/${cabecera}`;
        // console.log(ruta);
        return this._httpClient.get(ruta);
    }

    postPedidos(listaDatosDeEntrega, idTipo , numerocbte): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidosatrabajar/pedidodetalle/sinremitir/datoentrega/${idTipo}/${numerocbte}`;
        
        let body=   {
            "listaDatosDeEntrega": listaDatosDeEntrega
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.post(ruta,body,{headers:headers});
    }


    putPedidos(listaDatosDeEntrega): Observable<any>
    {   
        let ruta = `${BASE_URL}pedidosatrabajar/datosentrega`;
        
        let body=   {
            "listaDatosDeEntrega": listaDatosDeEntrega
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });

        return this._httpClient.post(ruta,body,{headers:headers});
    }

}
