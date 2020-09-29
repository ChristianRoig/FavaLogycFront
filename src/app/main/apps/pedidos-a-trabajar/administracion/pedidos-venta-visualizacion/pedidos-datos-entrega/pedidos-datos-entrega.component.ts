import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { PedidosVentaVisualizacionService } from '../pedidos-venta-visualizacion.service';
import { PedidosAgregarPedido2Service } from '../../pedidos-agregar-pedido-2/pedidos-agregar-pedido-2.service';
import { AgregarDatosEntregaComponent } from '../../pedidos-agregar-pedido-2/agregar-datos-entrega/agregar-datos-entrega.component';

/**
 * @title Basic use of `<table mat-table>`
 */


export interface Articulo {
  id: number,
  codigoArticulo: string,
  codigoCliente: string,
  codigoDeBarras: string,
  nombreArticulo: string,
  nombreCliente: string,
  numeroCbte: string,
  tipoCbte: string
}


export interface DatosDeEntrega {
  datos : Array< ListaDatosDeEntrega>
}


export interface ListaDatosDeEntrega 
    {
      id: number,
      direccion: string,
      fechaDeEntrega: string,
      telefono: string,
      mail: string,
      contacto: string,
      observaciones: string,
      sysLocalidad: {
          id: number,
          sysProvincia: {
              id: number,
          }
      },
      sysTransporte: {
          id: number,
      },
      pedidoTurno: {
          id: number,
      },
      listaPedidoDetalle: Array <Articulo>
    }

  @Component({
      selector     : 'pedidos-datos-entrega',
      templateUrl  : './pedidos-datos-entrega.component.html',
      styleUrls    : ['./pedidos-datos-entrega.component.scss']
  })

export class PedidosDatosEntregaComponent implements OnInit {

  @Input('idCabecera') idCabecera: number;

  dataSourceDatosEntrega: any;
  dataSourceDatosDeEntrega: DatosDeEntrega;

  displayedColumnsDatosEntrega: string[] = ['lote', 'codigoArticulo', 'direccion', 'localidad', 'provincia', 'codigoPostal', 'transporte', 'contacto', 'telefono', 'mail', 'observaciones', 'fechaEntrega', 'turno', 'editar'];
  displayedColumnsPedidoDetalle: string[] = ['codigoArticulo','nombre'];

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;

  isChecked = true;

  listaDatosVacia: DatosDeEntrega = {
    datos: []
  };

  constructor(
      private _router: Router,
      private route: ActivatedRoute,
      private _service: PedidosVentaVisualizacionService,
      private _serviceDatoEntrega : PedidosAgregarPedido2Service,
      private _dialog: MatDialog
  )
  {
      
  }

  ngOnInit(): void{
    this.page = 0;
    this.size = 50;
    this.columna = 'direccion';
    this.order = 'asc';

    this.buscarDatosEntrega(this.page, this.size, this.columna, this.order);
    
    this.dataSourceDatosDeEntrega = this.listaDatosVacia;
    this.getDatosDeEntrga();
    console.log('termino el onInit');
  }

  buscarDatosEntrega(page, size, columna, order){
    this._service.getDatosEntrega(this.idCabecera, page, size, columna, order).subscribe(paramsArt => {
      if(paramsArt){
        this.dataSourceDatosEntrega = paramsArt.datos;
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
          let titulo = 'Error al cargar Datos de Entrega';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getDatosDeEntrga(){
    this._serviceDatoEntrega.getDatosDeEntregaUpd(this.idCabecera).subscribe((params) => {

      this.dataSourceDatosDeEntrega.datos = params;
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
          let titulo = 'Error al cargar los Pedidos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })
  }

  verDatoEntrega(item){
    console.log(item);

    let dialogRef = this._dialog.open(AgregarDatosEntregaComponent, {
      width: window.innerWidth+'px',
      data: {
        option: 'view',
        item: item
      } 
    });
  }

  sortData( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
    this.order = event.direction;
    
        this.buscarDatosEntrega(this.page, this.size, this.columna, this.order);
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscarDatosEntrega(this.page, this.size, this.columna, this.order);
  }

  editar(){
    let ruta = `apps/pedidos/administracion/addPedido2/${this.idCabecera}`;

    this._router.navigate([ruta]);
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
        
          this.buscarDatosEntrega(this.page, this.size, this.columna, this.order);
          
        } else {
          this._router.navigate(['']);
        }
    });
  }
}