import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAgregarLoteService } from './pedidos-agregar-lote.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

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

@Component({
  selector: 'app-pedidos-agregar-lote',
  templateUrl: './pedidos-agregar-lote.component.html',
  styleUrls: ['./pedidos-agregar-lote.component.scss']
})

export class PedidosAgregarLoteComponent implements OnInit {

  @ViewChild('buscarNombreLote') buscarNombreLote: ElementRef;


  subParametros: Subscription;
  
  displayedColumnsArticulos: string[] = ['select','id','codigoArticulo','nombre','cantidad','estado','etapa'];


  dataSourceArticulos: any;
  cantidad: number;
  idCabecera: any;
  picker: Date;
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array<number>();

  nombreLote: string;

  constructor(private _router: Router,
              private _service: PedidosAgregarLoteService, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    })

    this.dataSourceArticulos = JSON.parse(localStorage.getItem('Lote'))._selected;

    this.cantidad = this.dataSourceArticulos.length;

    this.picker =  new Date();
    
    console.log(this.dataSourceArticulos);    
    console.log(this.cantidad);    
    
  }
  
  searchNombreLote() {

    this.nombreLote = this.buscarNombreLote.nativeElement.value;

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

  crearLote(){
    console.log("crearLote");

    localStorage.removeItem("Lote");
    console.log(this.selection);
    this.armarArrarIds();
  }

  armarArrarIds(){
    this.picker.getFullYear()
    let fecha = this.picker.getFullYear()+"-"+(this.picker.getMonth()+1)+"-"+this.picker.getDate();

    
    for (let elemento of this.selection.selected){
      this.toAdd.push(elemento.id);
    }
    
    this._service.postLote(this.toAdd , fecha, this.nombreLote).subscribe(
      data => {
        this.volver();
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
            let titulo = 'Error al Agregar';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    )
    // console.log(this.toAdd);
    // console.log(fecha);
    // console.log(this.nombreLote);
  }

  volver(){
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    this._router.navigate([ruta]);
  }

}
