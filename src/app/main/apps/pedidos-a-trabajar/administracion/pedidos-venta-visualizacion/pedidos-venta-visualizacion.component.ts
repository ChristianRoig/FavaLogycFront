import { Component, OnInit } from '@angular/core';
import { PedidosVentaVisualizacionService } from './pedidos-venta-visualizacion.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';

export interface Articulos {

  lote: number;
  codigoArticulo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  etapa: string;
}

const ELEMENT_DATA_ARTICULOS: Articulos[] = [
  {lote: 1,codigoArticulo: "HCTZCAB030",nombre: "CTZ CALEFACTOR 6000	",          descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"},
  {lote: 1,codigoArticulo: "HCTZACC010",nombre: "CTZ ACCESORIO TB	",              descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"},
  {lote: 1,codigoArticulo: "HMOUFRE050",nombre: "MOULINEX FREIDORA AF134DAR/D59	",descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"}
];

@Component({
  selector: 'app-pedidos-venta-visualizacion',
  templateUrl: './pedidos-venta-visualizacion.component.html',
  styleUrls: ['./pedidos-venta-visualizacion.component.scss']
})
export class PedidosVentaVisualizacionComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  subParametros: Subscription;
  
  // displayedColumnsArticulos: string[] = ['lote','codigoArticulo','nombre','descripcion','cantidad','estado','etapa'];
  displayedColumnsArticulos: string[] = ['lote','codigoArticulo','nombre','cantidad','etapa'];
  


  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: any;
  idCabecera: any;
  cabecera: any;

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;
  
  lengthTrazabilidad: number;
  pageTrazabilidad: number;
  sizeTrazabilidad: number;
  columnaTrazabilidad: string;
  orderTrazabilidad: string;



  constructor(private _router: Router,
              private _service: PedidosVentaVisualizacionService, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.page = 0;
    this.size = 100;
    this.columna = 'id';
    this.order = 'asc';

    this.subParametros = this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    })

    this._service.getCabecera(this.idCabecera).subscribe(params => {
      if(params){
        this.cabecera = params;
        // console.log(this.cabecera)
        this.buscarDetalle(this.page, this.size, this.columna, this.order);
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
          let titulo = 'Error al cargar Cabecera';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
    

  }

  buscarDetalle(page, size, columna, order){
    this._service.getDetalle(this.idCabecera,page, size, columna, order).subscribe(paramsArt => {
      if(paramsArt){
        this.dataSourceArticulos = paramsArt.datos;
        this.length = paramsArt.totalRegistros;
        // console.log(this.dataSourceArticulos);
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
          let titulo = 'Error al cargar Articulos';
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
    
    this.buscarDetalle(this.page, this.size, this.columna, this.order);
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscarDetalle(this.page, this.size, this.columna, this.order);
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
        
          this.buscarDetalle(this.page, this.size, this.columna, this.order);
          
        } else {
          this._router.navigate(['']);
        }
    });
  }

  volver(){
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    this._router.navigate([ruta]);
}

}
