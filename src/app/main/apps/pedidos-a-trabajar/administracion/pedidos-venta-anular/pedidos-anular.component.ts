import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAnularService } from './pedidos-anular.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
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

export interface Articulos {

  lote: number;
  codigoArticulo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  estado: string;
  etapa: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

const ELEMENT_DATA_ARTICULOS: Articulos[] = [
  {lote: 1,codigoArticulo: "HCTZCAB030",nombre: "CTZ CALEFACTOR 6000	",          descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"},
  {lote: 1,codigoArticulo: "HCTZACC010",nombre: "CTZ ACCESORIO TB	",              descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"},
  {lote: 1,codigoArticulo: "HMOUFRE050",nombre: "MOULINEX FREIDORA AF134DAR/D59	",descripcion: "12 MESES DE GARANTIA",cantidad: 1,estado: "INICIAL",etapa: "INICIAL"}
];
@Component({
  selector: 'app-pedidos-anular',
  templateUrl: './pedidos-anular.component.html',
  styleUrls: ['./pedidos-anular.component.scss']
})

export class PedidosAnularComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  subParametros: Subscription;
  
  // displayedColumnsArticulos: string[] = ['lote','codigoArticulo','nombre','descripcion','cantidad','estado','etapa'];
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre','cantidad','estado','etapa'];


  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: any;
  idCabecera: any;
  cabecera: any;
  
  selection = new SelectionModel<PeriodicElement>(true, []);

  motivo: any = '';

  length: number;
  page: number;
  size: number;
  columna: string;
  order: string;

  constructor(private _router: Router,
              private _service: PedidosAnularService, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.page = 0;
    this.size = 100;
    this.columna = 'id';
    this.order = 'asc';
    this.motivo = '';

    this.subParametros = this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    })

    this._service.getCabecera(this.idCabecera).subscribe(params => {
      if(params){
        this.cabecera = params;
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
          let titulo = 'Error al cargar filtros';
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
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceArticulos.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceArticulos.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
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
  }

  anular(){
    console.log("anular");
    console.log(this.selection);
    this.volver();
  }

  volver(){
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    this._router.navigate([ruta]);
  }

}
