import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

//componentes
import { ModalConfirmacionBorrarComponent } from './modal-confirmacion-borrar/modal-confirmacion-borrar.component';

//servicios
import { VerRemitoService } from './ver-remito.service';

export interface Remito{
  id: number;
  codComprobante: number;
  nroComprobante: string;
  fechaAlta: Date;
  cantArticulos: number;
}

@Component({
  selector: 'app-ver-remito',
  templateUrl: './ver-remito.component.html',
  styleUrls: ['./ver-remito.component.scss']
})


export class VerRemitoComponent implements OnInit {
  
  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;

  //displayedColumns: string[] = ['select', 'id', 'codComprobante', 'nroComprobante', 'fechaAlta', 'cantArticulos'];
  displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'cantPartes', 'localidad', 'direccion', 'fechaDeEntrega'];
  selection = new SelectionModel<any>(true, []);
  dataSource2: any;

  idRemito: number = null;
  remito: Remito = null;

  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'idDetalle';
  order: string = 'asc';

  mensaje: string;
  titulo: string;
  //editLote: boolean;

  constructor(
    private _verRemitoService: VerRemitoService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this._activatedRoute.params.subscribe( params => {

      this.idRemito = params['id'];
      this.getRemitoPorId( params['id'] );
      console.log("id remito -> ", params['id']);
    });
  }
  
  getRemitoPorId( idRemito: number ){
    let resultado: any = [];
    console.log("busqueda", this.busqueda);
    this._verRemitoService.getRemitoPorId( idRemito ).subscribe( data => {
      console.log( "acá" ,data );
      resultado.push( data );
      console.log( resultado[0].pedidoDetalles );
      this.dataSource2 = resultado[0].pedidoDetalles;
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
          let titulo = 'No encontrado';
          let mensaje = "El remito no existe";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  confirmacionBorrar() {
    const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent, { 
      data: {
        id: this.idRemito,
        nombre: "Remito "+ this.idRemito,

      } 
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if ( result )
          this.volver();
      }); 
  }

  volver(){
    let ruta = `apps/remitos/lista-remitos`;
      this._router.navigate([ruta]);
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  //@Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.page = 0;
    this.columna = 'id';
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
            
            
          } else {
            this._router.navigate(['']);
          }
      });
  }
  
  sortData( event ) {
      
    this.page = 0;
    this.columna = event.active; 
    if (event.direction !== "")
        this.order = event.direction;
    
    //this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
}
