import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TableComprobantesSinRemitirService } from './table-comprobantesSR.service';

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
  selector: 'app-table-comprobantesSR',  
  templateUrl: './table-comprobantesSR.component.html',
  styleUrls: ['./table-comprobantesSR.component.scss']
})

export class TableComprobantesSinRemitirComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['Comprobante', 'fechaEntrega', 'NombreArticulo', 'cantArticulos', 'estadoCeDIS', 'priEtapa'];  
  dataSource2: any;

  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'nroCbte';
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
              private _tableComprobantesService: TableComprobantesSinRemitirService,
              private _dialog: MatDialog ) { }

  ngOnInit(): void { 
    
    this.getComprobantesSinRemitir( );
  }

  getComprobantesSinRemitir( ){
    this._tableComprobantesService.getComprobantesSinRemitir( this.page, this.size, this.columna, this.order).subscribe(
      data => {
        console.log("getComprobantesSinRemitir ->",data);
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
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
            this.getComprobantesSinRemitir( );
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  getComprobanteSinRemitir(){
    this._tableComprobantesService.getComprobanteSinRemitir( this.busqueda, this.page, this.size, this.columna, this.order ).subscribe(
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
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
  }

  @Debounce(1000) 
  searchCbte() {
    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.busqueda = this.busqueda.toLocaleUpperCase();
    if( this.busqueda === '' || this.busqueda == null){
      this.getComprobantesSinRemitir( );
    }
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
    
    this.getComprobantesSinRemitir();
  }


  paginar(e: any){
      this.page = e.pageIndex;
      this.size = e.pageSize;
      
      this.getComprobantesSinRemitir();
  }
}
