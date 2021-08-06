import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosVisualizacionService } from '../pedidos-visualizacion.service';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'pedidos-cupa',
    templateUrl  : './pedidos-cupa.component.html',
    styleUrls    : ['./pedidos-cupa.component.scss']
})

export class PedidosCupaComponent implements OnInit {

  @Input('idCabecera') idCabecera: number;

  dataSourceCUPA: any;

  displayedColumnsCupa: string[] = ['lote', 'codigoArticulo','codigoUnicoParteArticulo', 'etapa', 'info', 'accionUno', 'accion'];

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;


  idPedidoCbte: number;
  idPedido: number;
  mensaje: string;
  vengoDeCbte: string;

  constructor(
      private _router: Router,
      private _service: PedidosVisualizacionService,
      private _dialog: MatDialog,
      private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void{

    this._activatedRoute.params.subscribe( params => {
      this.idPedido = params['id'];
    });

    console.log("idPedido", this.idPedido);
    this.page = 0;
    this.size = 50;
    this.columna = 'id';
    this.order = 'asc';
    
    this.idPedidoCbte = +localStorage.getItem('idCbte');
    this.vengoDeCbte = localStorage.getItem('vengoDeCbte');

    this.buscarCUPA(this.page, this.size, this.columna, this.order);

  }

  buscarCUPA(page, size, columna, order){
    if (this.vengoDeCbte == "true"){
      console.log("CUPA - vengo de comprobante", this.idPedidoCbte);
      this._service.getCUPA( this.idPedidoCbte, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          this.dataSourceCUPA = paramsArt.datos;
          console.log("CUPA ->",this.dataSourceCUPA);
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
    if (this.vengoDeCbte == "false"){
      console.log("CUPA - vengo de pedido");
      this._service.getCUPAPedidos( this.idPedido, page, size, columna, order ).subscribe(paramsArt => {
        if(paramsArt){
          this.dataSourceCUPA = paramsArt.datos;
          console.log("CUPA ->",this.dataSourceCUPA);
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

  imprimirCupa( id: number ){
    this._service.getImprimirCUPA( id ).subscribe( data => {

      console.log("data", data );
      window.open( data.toString(), '_blank');
      
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        let errStatus = err.status;
        if (errStatus == 0){
          let titulo = 'Error de Servidor';
          let mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          let titulo = 'Error al imprimir';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  sortData( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
    this.order = event.direction;
    
        this.buscarCUPA(this.page, this.size, this.columna, this.order);
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscarCUPA(this.page, this.size, this.columna, this.order);
  }

  verLote( idLote ){

    this._router.navigate([ `lotes/ver-lote/${ idLote }` ]);
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
        
          this.buscarCUPA(this.page, this.size, this.columna, this.order);
          
        } else {
          this._router.navigate(['']);
        }
    });
  }
}