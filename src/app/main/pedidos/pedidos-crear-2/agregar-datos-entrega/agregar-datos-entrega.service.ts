import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DATOS_ENTREGA, RootObject, LISTA_PEDIDOS } from 'app/shared/interfaces/datos-entrega';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

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

  getAllLocalidadesPorProvincia( id:number ): Observable<any> {
    let ruta = `${BASE_URL}pedidos/localidad/provincia/${ id }`;
    return this.http.get(ruta);
  }

  getAllProvincias(): Observable<any> {
    let ruta = `${BASE_URL}pedidos/provincia`;
    return this.http.get(ruta);
  }

  getAllTransportes(): Observable<any>{
    let ruta = `${BASE_URL}pedidos/transporte/`;
    return this.http.get(ruta);
  }

  getAllTurnos(): Observable<any> {
      let ruta = `${BASE_URL}pedidos/pedidoturno/`;
      return this.http.get(ruta);
  }

  getProvinciaPorLocalidad( id:number ): Observable<any> {
      let ruta = `${BASE_URL}pedidos/provincia/localidad/${ id }`;
      return this.http.get(ruta);
  }
  
  getAllLocalidades(): Observable<any> {
      //let ruta = `${BASE_URL}pedidos/localidad/domicilio/`; //este esta llamando a "Get All Localidad filtrado por Domicilio De Entrega"
      let ruta = `${BASE_URL}pedidos/localidad/`; //getAllLocalidad
      return this.http.get(ruta);
  }
  getDomiciliosCliente( comprobante ): Observable<any> {
      let ruta = `${BASE_URL}comprobante/direccionesposibles/${ comprobante }`; //getAllLocalidad
      return this.http.get(ruta);
  }


}

