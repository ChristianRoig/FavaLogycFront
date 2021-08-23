import {Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosVisualizacionService } from '../pedidos-visualizacion.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'notificaciones-comprobante',
    templateUrl  : './notificaciones-comprobante.component.html',
    styleUrls    : ['./notificaciones-comprobante.component.scss'],
    animations   : fuseAnimations
})

export class NotificacionesComprobanteComponent implements OnInit {

  dataSource: any;
  displayedColumnsTrazabilidad: string[] = ['novedad', 'estado', 'comprobante', 'btnLeido', 'btnProcesado'];
  idPedidoCbte: number;
  idPedidoCabecera: number;
  mensaje:string = "No se encontraron notificaciones";
  length: number;
  nroCbte: string;

  constructor(private route: ActivatedRoute,
              private _service: PedidosVisualizacionService,
              private _dialog: MatDialog ) { }

  ngOnInit(): void{
    console.log("inicioooo notificacione");

    this.route.params.subscribe( params => {
      this.idPedidoCabecera = params['id'];
      //console.log(this.idPedidoCabecera);
    });

    this.obtenerCabeceraDePedido();
  }

  /* ------------------------------------------------ */
  obtenerCabeceraDePedido(){
    this._service.getCabecera( this.idPedidoCabecera ).subscribe(params => {
      if (params) {
        console.log(params);
        console.log(params.pedidoCbte.nroCbte);
        this.nroCbte = params.pedidoCbte.nroCbte;
        this.getListaDeNotificacionesPorCbte( this.nroCbte );
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        const errStatus = err.status;
        if (errStatus == 0){
          const titulo = 'Error de Servidor';
          const mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          const titulo = 'Error al cargar Cabecera';
          const mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }
  /* ------------------------------------------------ */

  getListaDeNotificacionesPorCbte( nroCbte: string){

    this._service.getListaDeNotificacionesPorCbte( nroCbte ).subscribe(paramsArt => {
      if ( paramsArt ){
        console.log( paramsArt );
        this.dataSource = paramsArt.datos;
        this.length = paramsArt.totalRegistros;
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        const errStatus = err.status
        if (errStatus == 0){
          const titulo = 'Error de Servidor';
          const mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          const titulo = 'Error al cargar Trazabilidad';
          const mensaje = err.error.message.toString();
          this.mensaje = mensaje;
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });  
  }

  marcarComoLeidoOprocesado( tipoEstado: number , idNovedad: number ) {
    
    let body = {
      "estado": "LEIDO"
    }
    if ( tipoEstado === 2 ){
      body = {
        "estado": "PROCESADO"
      }
    }

    this._service.marcarNotificacionComoLeido( idNovedad, body ).subscribe( data => {
      console.log("respuesta notificacion", data );
      this.getListaDeNotificacionesPorCbte( this.nroCbte );
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        const errStatus = err.status
        if (errStatus == 0){
          const titulo = 'Error de Servidor';
          const mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          const titulo = 'Error al cargar Trazabilidad';
          const mensaje = err.error.message.toString();
          this.mensaje = mensaje;
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });  
  }

  mostrarError(errStatus, titulo, mensaje): void {
    this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
  }
}