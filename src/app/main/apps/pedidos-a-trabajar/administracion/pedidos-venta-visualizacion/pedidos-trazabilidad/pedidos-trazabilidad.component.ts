import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { PedidosVentaVisualizacionService } from '../pedidos-venta-visualizacion.service';

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

  displayedColumnsTrazabilidad: string[] = ['fecha', 'estado', 'etapa', 'accion', 'cupa', 'codigoArticulo', 'usuario'];

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;

  mensaje:string;

  constructor(
      private _router: Router,
      private route: ActivatedRoute,
      private _service: PedidosVentaVisualizacionService,
      private _dialog: MatDialog
  )
  {
      
  }

  ngOnInit(): void{
    this.page = 0;
    this.size = 50;
    this.columna = 'fecha';
    this.order = 'asc';

    this.buscarTrazabilidad(this.page, this.size, this.columna, this.order);

  }

  buscarTrazabilidad(page, size, columna, order){
    this._service.getTrazabilidad(this.idCabecera,page, size, columna, order).subscribe(paramsArt => {
      if(paramsArt){
        this.dataSourceTrazabilidad = paramsArt.datos;
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