import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosVisualizacionService } from '../pedidos-visualizacion.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'pedidos-trazabilidad',
    templateUrl  : './pedidos-trazabilidad.component.html',
    styleUrls    : ['./pedidos-trazabilidad.component.scss'],
    animations   : fuseAnimations
})

export class PedidosTrazabilidadComponent implements OnInit {

  @Input('idCabecera') idCabecera: number;

  dataSourceTrazabilidad: any;

  displayedColumnsTrazabilidad: string[] = ['fecha', 'etapa', 'accion', 'cupa', 'cantidad', 'codigoArticulo', 'usuario', 'info'];

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;

  idPedidoCbte: number;
  idPedidoCabecera: number;
  vengoDeCbte: string;
  mensaje:string;

  constructor(
      private _router: Router,
      private route: ActivatedRoute,
      private _service: PedidosVisualizacionService,
      private _dialog: MatDialog
  )
  {
      
  }

  ngOnInit(): void{

    this.route.params.subscribe( params => {
      this.idPedidoCabecera = params['id'];
      //console.log(this.idPedidoCabecera);
    });

    this.page = 0;
    this.size = 50;
    this.columna = 'fecha';
    this.order = 'asc';

    this.idPedidoCbte = +localStorage.getItem('idCbte');
    this.vengoDeCbte = localStorage.getItem('vengoDeCbte');

    this.buscarTrazabilidad(this.page, this.size, this.columna, this.order);

  }

  buscarTrazabilidad(page, size, columna, order){
    if ( this.vengoDeCbte == "true"){
      //console.log("vengo desde COMPROBANTE");
      this._service.getTrazabilidad( this.idPedidoCbte, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          this.dataSourceTrazabilidad = paramsArt.datos;
          //console.log("TRAZABILIDAD -> ", this.dataSourceTrazabilidad);
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
    if  ( this.vengoDeCbte == "false"){
      //console.log("vengo desde PEDIDO");
      this._service.getTrazabilidadPedidos( this.idPedidoCabecera, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          this.dataSourceTrazabilidad = paramsArt.datos;
          console.log("TRAZABILIDAD -> ", this.dataSourceTrazabilidad);
          this.length = paramsArt.totalRegistros;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
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
    
        this.buscarTrazabilidad(this.page, this.size, this.columna, this.order);
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscarTrazabilidad(this.page, this.size, this.columna, this.order);
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
                  
        } else {
          this._router.navigate(['']);
        }
    });
  }
}