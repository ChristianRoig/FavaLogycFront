import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAgregarPedido1Service } from './pedidos-agregar-pedido-1.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidosListaService } from '../pedidos-lista/pedidos-lista.service';

@Component({
  selector: 'app-pedidos-agregar-pedido-1',
  templateUrl: './pedidos-agregar-pedido-1.component.html',
  styleUrls: ['./pedidos-agregar-pedido-1.component.scss']
})

export class PedidosAgregarPedido1Component implements OnInit {

  @ViewChild('buscarPuntoVenta') buscarPuntoVenta: ElementRef;
  @ViewChild('buscarCbte') buscarCbte: ElementRef;


  subParametros: Subscription;
  
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre','codigoDeBarras'];

  dataSourceArticulos: any;
  cabecera: any;
  picker: any;
  selection = new SelectionModel<any>(true, []);

  filtroTipos: any;
  selectedTipo: any = 1;

  puntoVenta: string = "B00088";
  cbte: string = "00024195";

  mostrarArticulos: boolean = false;

  constructor(private _router: Router,
              private _service: PedidosAgregarPedido1Service, 
              private _pedidosListaService: PedidosListaService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.getfiltros();

  }

  buscar(){
    let comprobante = this.puntoVenta+this.cbte
    this._service.getDetalle(this.selectedTipo, comprobante).subscribe(params => {
      this.dataSourceArticulos = params.datos;
      this.mostrarArticulos = true;
    },
    (err: HttpErrorResponse) => {
      this.mostrarArticulos = false;
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
    })
  }

  agregar(){
    localStorage.setItem('AddPedido',JSON.stringify(this.selection));
    
    let ruta = `apps/pedidos/administracion/addPedido2/ins`;

    this._router.navigate([ruta]);
  }
  
  searchCbte() {

    this.cbte = this.buscarCbte.nativeElement.value;

  }
  
  searchPuntoVenta() {

    this.puntoVenta = this.buscarPuntoVenta.nativeElement.value;

  }

  getfiltros(){
    this._pedidosListaService.getAllTipos().subscribe(params => {
      this.filtroTipos = params.datos;
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
    })
  }

  selectTipo(event: Event) {
    this.selectedTipo = (event.target as HTMLSelectElement).value;
    console.log(this.selectedTipo);
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

  addEvent( evento ) {
    if (evento.value) {
      let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;
      this.picker = fecha;
    } else {
      this.picker = null;
    }
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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  volver(){
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    this._router.navigate([ruta]);
  }

}
