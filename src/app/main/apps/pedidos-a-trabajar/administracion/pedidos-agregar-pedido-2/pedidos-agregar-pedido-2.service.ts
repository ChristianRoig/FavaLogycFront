import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { RootObject, DATOS_ENTREGA, LISTA_PEDIDOS } from 'app/main/apps/interfaces/datos-entrega';

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
        return this._httpClient.get(ruta)
        .pipe(
            map( (resp: RootObject) => {
    
              let datos_entrega = new Array<DATOS_ENTREGA>();
      
      
              resp.datos.forEach( (datos) => {
      
                let dato = new DATOS_ENTREGA();
      
                dato.listaPedidoDetalle = [];
      
                dato.id = datos.id;
                dato.contacto = datos.contacto;
                dato.direccion = datos.direccion;
                dato.fechaDeEntrega = datos.fechaDeEntrega;
                dato.mail = datos.mail;
                dato.observaciones = datos.observaciones;
                dato.pedidoTurno = datos.pedidoTurno;
                dato.sysLocalidad = datos.sysLocalidad;
                dato.sysTransporte = datos.sysTransporte;
                dato.telefono = datos.telefono;
      
                datos.listaPedidoDetalle.forEach ( (lista: any) => {
      
                  let pedido = new LISTA_PEDIDOS();
      
                  pedido.id = lista.id;
                  pedido.tipoCbte = lista.pedidoCabecera.pedidoCbte.pedidoTipoCbte.codigoCbte;
                  pedido.numeroCbte = lista.pedidoCabecera.pedidoCbte.nroCbte;
                  pedido.codigoCliente = lista.pedidoCabecera.pedidoCliente.codigo;
                  pedido.nombreCliente = lista.pedidoCabecera.pedidoCliente.nombre;
                  pedido.codigoArticulo = lista.articulo.codigoArticulo;
                  pedido.codigoDeBarras = '';
                  pedido.nombreArticulo = lista.articulo.nombre;
      
                  dato.listaPedidoDetalle.push( pedido );
                } )
      
                datos_entrega.push( dato )
      
      
                
              } )
    
              return datos_entrega;
            } )
              
            );
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
