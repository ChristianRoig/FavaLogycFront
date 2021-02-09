import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DATOS_ENTREGA, RootObject, LISTA_PEDIDOS } from '../../../interfaces/datos-entrega';
import { map } from 'rxjs/operators';
//import { map } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class AgregarDatosEntregaService {

  constructor( private http: HttpClient ) { }

  getDatosEntrega() {

    return this.http.get('http://192.168.100.191:8080/api_favalogyc/pedidos/datosentrega/cabecera/38')
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
          
        )
  }
}
