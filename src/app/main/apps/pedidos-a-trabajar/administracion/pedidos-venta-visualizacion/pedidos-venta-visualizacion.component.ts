import { Component, OnInit } from '@angular/core';
import { PedidosVentaVisualizacionService } from './pedidos-venta-visualizacion.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Articulos {

  lote: number;
  codigoArticulo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  etapa: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
  dataSource = ELEMENT_DATA;
  subParametros: Subscription;
  
  // displayedColumnsArticulos: string[] = ['lote','codigoArticulo','nombre','descripcion','cantidad','estado','etapa'];
  displayedColumnsArticulos: string[] = ['lote','codigoArticulo','nombre','cantidad','estado','etapa'];
  displayedColumnsCupa: string[] = ['lote','cupa', 'descripcionCupa', 'codigoArticulo', 'codigoBarras', 'descripcionCodigoBarras', 'estado', 'etapa'];
  displayedColumnsCbts: string[] = ['tipoCbte', 'nroCbte', 'fechaCbte'];
  displayedColumnsDatosEntrega: string[] = ['lote', 'codigoArticulo', 'direccion', 'localidad', 'provincia', 'codigoPostal', 'contacto', 'telefono', 'mail', 'observaciones', 'fechaEntrega', 'turno'];
  displayedColumnsOtrosDatos: string[] = ['codigoArticulo', 'nombre', 'accion', 'observaciones'];
  displayedColumnsTrazabilidad: string[] = ['fecha', 'estado', 'etapa', 'accion', 'cupa', 'codigoArticulo', 'usuario'];


  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: any;
  dataSourceTrazabilidad: any;
  dataSourceDatosEntrega: any;
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

  lengthDatosEntrega: number;
  pageDatosEntrega: number;
  sizeDatosEntrega: number;
  columnaDatosEntrega: string;
  orderDatosEntrega: string;



  constructor(private _router: Router,
              private _service: PedidosVentaVisualizacionService, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.page = 0;
    this.size = 100;
    this.columna = 'id';
    this.order = 'asc';

    this.pageTrazabilidad = 0;
    this.sizeTrazabilidad = 50;
    this.columnaTrazabilidad = 'fechaAlta';
    this.orderTrazabilidad = 'asc';

    this.pageDatosEntrega = 0;
    this.sizeDatosEntrega = 50;
    this.columnaDatosEntrega = 'direccion';
    this.orderDatosEntrega = 'asc';

    this.subParametros = this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    })

    this._service.getCabecera(this.idCabecera).subscribe(params => {
      if(params){
        this.cabecera = params;
        // console.log(this.cabecera)
        this.buscarDetalle(this.page, this.size, this.columna, this.order);
        this.buscarTrazabilidad(this.pageTrazabilidad, this.sizeTrazabilidad, this.columnaTrazabilidad, this.orderTrazabilidad);
        this.buscarDatosEntrega(this.pageDatosEntrega, this.sizeDatosEntrega, this.columnaDatosEntrega, this.orderDatosEntrega);
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

  buscarTrazabilidad(page, size, columna, order){
    this._service.getTrazabilidad(this.idCabecera,page, size, columna, order).subscribe(paramsArt => {
    // this._service.getTrazabilidad(, page, size, columna, order).subscribe(paramsArt => {
      if(paramsArt){
        this.dataSourceTrazabilidad = paramsArt.datos;
        this.lengthTrazabilidad = paramsArt.totalRegistros;
        console.log(this.dataSourceTrazabilidad);
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
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  buscarDatosEntrega(page, size, columna, order){
    // this._service.getTrazabilidad(this.idCabecera,page, size, columna, order).subscribe(paramsArt => {
    this._service.getDatosEntrega(this.idCabecera, page, size, columna, order).subscribe(paramsArt => {
      if(paramsArt){
        this.dataSourceDatosEntrega = paramsArt.datos;
        this.lengthDatosEntrega = paramsArt.totalRegistros;
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
          let titulo = 'Error al cargar Datos de Entrega';
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

  sortDataCUPA( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.buscarDetalle(this.page, this.size, this.columna, this.order);
  }

  sortDataComprobantes( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.buscarDetalle(this.page, this.size, this.columna, this.order);
  }

  sortDataTrazabilidad( event ) {
        
    this.pageTrazabilidad = 0;
    this.columnaTrazabilidad = event.active;
    
    if (event.direction !== "")
        this.orderTrazabilidad = event.direction;
    
    this.buscarTrazabilidad(this.pageTrazabilidad, this.sizeTrazabilidad, this.columnaTrazabilidad, this.orderTrazabilidad);
  }

  sortDataOtrosDatos( event ) {
        
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.buscarDetalle(this.page, this.size, this.columna, this.order);
  }

  sortDataDatosEntrega( event ) {
        
    this.pageDatosEntrega = 0;
    this.columnaDatosEntrega = event.active;
    
    if (event.direction !== "")
    this.orderDatosEntrega = event.direction;
    
        this.buscarDatosEntrega(this.pageDatosEntrega, this.sizeDatosEntrega, this.columnaDatosEntrega, this.orderDatosEntrega);
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
