import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TableComprobantesService } from './table-comprobantes.service';

export interface Articulos {
  Id: number;
  Tipo: string;
  CodigoArticulo: string;
  Nombre: string;
  Comprobante: string;
  FechaEntrega: string;
  Prov: string;
  Loc: string;
  Estado: string;
  Etapa: string;
  Lote: number;
}

export interface BodyDetalle{
  idTipo : number;
  idTurno : number;
  idOrigen : number;
  idEstado : number;
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  lote : string;
  desdeLote : string;
  hastaLote : string;
}

@Component({  
  selector: 'app-table-comprobantes',  
  templateUrl: './table-comprobantes.component.html',
  styleUrls: ['./table-comprobantes.component.scss']
})

export class TableComprobantesComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['Tipo', 'idComprobante', 'cantArticulos', 'NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'CantDirecEntrega', 'priDireccion', 'Provincia', 'Localidad', 'cantEtapa', 'priEtapa'];  
  dataSource2: any;

  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'codigoArticulo';
  order: string = 'asc';

  mensaje: string;

  maxDateHastaLote: Date;

  body: BodyDetalle = {
    idTipo      : null,
    idTurno     : null,
    idOrigen    : null,
    idEstado    : null,
    idEtapa     : null,
    idProvincia : null,
    idLocalidad : null,
    desdePedido : null,
    hastaPedido : null,
    lote        : null,
    desdeLote   : null,
    hastaLote   : null
  };

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _tableComprobantesService: TableComprobantesService,
              private _dialog: MatDialog ) { 


  }

  ngOnInit(): void { 
    
    this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  getDetalles(busqueda, page, size, columna, order){

    this._tableComprobantesService.getPedidosDetalles(this.body, busqueda, page, size, columna, order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        console.log(data);
        /*console.log("asd", this.dataSource2); */
        //this.size = data.totalRegistros;
      },
      (err: HttpErrorResponse) => {
        this.length = 0
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al cargar filtros';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            // this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
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
            this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  buscar(busqueda){
    this._tableComprobantesService.getPedidoDetalle(this.body, busqueda, this.page, this.size, this.columna, this.order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        console.log(data);
        console.log("asd", this.dataSource2);
        //this.size = data.totalRegistros;
      },
      (err: HttpErrorResponse) => {
        this.length = 0
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al buscar un comprobante';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            // this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
  }

 
  searchCbte() {
    
    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.page = 0;
    this.columna = 'id';
    console.log(this.busqueda);
    if( this.busqueda === '' || this.busqueda == null){
      this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);
    }
    //this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  @Debounce(1000)  
  searchLote() {

    this.lote = this.buscarLoteInput.nativeElement.value;
    if(this.lote === '')
      this.lote =null;
    this.page = 0;
    this.columna = 'id';

    this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);

  }

  consultar(id){
    let ruta = `apps/pedidos/ver-pedido/${id}`;
    this._router.navigate([ruta]);
  }

  agregarPedido() {
    let ruta = `apps/pedidos/crear-pedido`;
    console.log(ruta);
    this._router.navigate([ruta]);
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void
  {
      this._fuseSidebarService.getSidebar(key).toggleOpen();
  }  

  sortData( event ) {
      
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);
  }


  paginar(e: any){
      this.page = e.pageIndex;
      this.size = e.pageSize;
      
      this.getDetalles(this.busqueda, this.page, this.size, this.columna, this.order);
  }
}
