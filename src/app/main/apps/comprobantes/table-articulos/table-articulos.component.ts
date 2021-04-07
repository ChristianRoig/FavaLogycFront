import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

//service
import { TableArticulosService } from './table-articulos.service';

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
  selector: 'app-table-articulos',  
  templateUrl: './table-articulos.component.html',
  styleUrls: ['./table-articulos.component.scss']
})

export class TableArticulosComponent implements OnInit {

  //@Output() cantArt: EventEmitter<number>;

  @ViewChild('buscarArticulo') buscarArticuloInput: ElementRef;


  displayedColumns: string[] = ['comprobante', 'fechaDeEntrega', 'direccion', 'codigoArt', 'nombreArticulo', 'etapa', 'seleccionar'];  
  dataSource2: any;

  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'nombreArticulo';
  order: string = 'asc';

  mensaje: string;

  maxDateHastaLote: Date;

  body = {
    "idTipo" : null,
    "idTurno" : null,
    "idOrigen" : null,
    "idEtapa" : null,
    "idProvincia" : 1,
    "idLocalidad" : null,
    "desdePedido" : null,
    "hastaPedido" : "null",
    "idLote" : null
  }
/* 
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
  }; */

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _tableArticulosService: TableArticulosService,
              private _dialog: MatDialog ) { }

  ngOnInit(): void { 
    this.getArticulosDePedidos( );
  }

  getArticulosDePedidos( ){
    this._tableArticulosService.getArticulosDePedidos( this.body, this.page, this.size, this.columna, this.order ).subscribe(
      data => {
        console.log("data articulos de pedidos -> ", data);
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        //this.cantArt.emit( this.length ); //devuelvo el total de Articulos
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
            let titulo = 'Error al listar los articulos';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            this.mostrarError(errStatus, titulo, mensaje);
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
            this.getArticulosDePedidos(  );
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  @Debounce(1000)  
  searchArticulo() {
    this.busqueda = this.buscarArticuloInput.nativeElement.value;
    this.busqueda = this.busqueda.toLocaleUpperCase();
    console.log(this.busqueda);
    if( this.busqueda === '' || this.busqueda == null){
      this.getArticulosDePedidos( ); 
    }
  }

  getArticulo( ){ 
    this._tableArticulosService.getArticuloDePedido(this.body, this.busqueda, this.page, this.size, this.columna, this.order).subscribe(
      data => {
        console.log("respuesta de buscar", data);
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
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
            let titulo = 'Error al buscar un articulo';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
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
    
    this.getArticulosDePedidos( );
  }

  paginar(e: any){
      this.page = e.pageIndex;
      this.size = e.pageSize;
      
      this.getArticulosDePedidos( );
  }
}
