import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosVisualizacionService } from '../pedidos-visualizacion.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'pedidos-comprobantes',
    templateUrl  : './pedidos-comprobantes.component.html',
    styleUrls    : ['./pedidos-comprobantes.component.scss'],
    animations   : fuseAnimations
})

export class PedidosComprobantesComponent implements OnInit {

  @Input('idCabecera') idCabecera: number;

  dataSourceComprobantes: any;

  displayedColumnsCbts: string[] = ['codigoArticulo','codigoCbte', 'nroCbte', 'fechaCbte', 'accion'];

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;

  idPedidoCabecera: number;
  idPedidoCbte: number;
  mensaje: string;
  vengoDeCbte: string;

  constructor(
      private _router: Router,
      private route: ActivatedRoute,
      private _service: PedidosVisualizacionService,
      private _dialog: MatDialog
  ){ }

  ngOnInit(): void{

    this.route.params.subscribe( params => {
      this.idPedidoCabecera = params['id'];
      //console.log(this.idPedidoCabecera);
    });

    this.page = 0;
    this.size = 50;
    this.columna = 'id';
    this.order = 'asc';
    this.idPedidoCbte = +localStorage.getItem('idCbte');
    this.vengoDeCbte = localStorage.getItem('vengoDeCbte');

    this.buscarComprobantes(this.page, this.size, this.columna, this.order);

  }

  buscarComprobantes(page, size, columna, order){

    if( this.vengoDeCbte == "true"){ 
      this._service.getComprobantes( this.idPedidoCbte, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          //console.log("COMPROBANTES - vengo de comprobante", this.idPedidoCbte);
          //console.log("comprobantes -> ", paramsArt);
          this.dataSourceComprobantes = paramsArt.datos;
          //console.log("esteeeeeeeee", this.dataSourceComprobantes);
          this.length = paramsArt.totalRegistros;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
         // console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al cargar Trazabilidad';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
          }
        }
      });
    }
    if( this.vengoDeCbte == "false"){ 
      this._service.getComprobantesPedidos( this.idPedidoCabecera, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          //console.log("COMPROBANTES - vengo de pedido", this.idPedidoCabecera);
          //console.log("comprobantes -> ",paramsArt);
          this.dataSourceComprobantes = paramsArt.datos;
          this.length = paramsArt.totalRegistros;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          //console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al cargar Trazabilidad';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
          }
        }
      });
    }
  }

  sortData( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
    this.order = event.direction;
    
        this.buscarComprobantes(this.page, this.size, this.columna, this.order);
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscarComprobantes(this.page, this.size, this.columna, this.order);
  }

  mostrarError(errStatus, titulo, mensaje){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });

    dialogRef.afterClosed()
      .subscribe( () => {
        if (errStatus != 0) {  

          this.page = 0;
          this.size = 100;
          this.columna = 'id';
          this.order = 'asc';
        
          this.buscarComprobantes(this.page, this.size, this.columna, this.order);
          
        } else {
          this._router.navigate(['']);
        }
    });
  }

  verRemito( id: number ){
    this._router.navigate([ `remitos/ver-remito/${ id }` ]);
  }
}