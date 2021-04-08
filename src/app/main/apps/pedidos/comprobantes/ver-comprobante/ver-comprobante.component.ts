import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

//servicios
import { VerComprobanteService } from './ver-comprobante.service';

@Component({
  selector: 'app-ver-comprobante',
  templateUrl: './ver-comprobante.component.html',
  styleUrls: ['./ver-comprobante.component.scss']
})

export class VerComprobanteComponent implements OnInit {
  
  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;

  displayedColumns: string[] = ['comprobante', 'fechaDeEntrega', 'direccion', 'nombreArticulo', 'etapa'];
  selection = new SelectionModel<any>(true, []);
  dataSource2: any;

  nroComprobante: number = null;

  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'idDetalle';
  order: string = 'asc';

  mensaje: string;
  titulo: string;

  /* //filtroTipos: any;
  selectedTipo: any = 0;
  
  //filtroTurnos: any;
  selectedTurno: any = 0;
  
  //filtroOrigenes: any;
  selectedOrigen: any = 0;

  //filtroEstados: any;
  selectedEstado: any = 0;

  //filtroEtapas: any;
  selectedEtapa: any = 0;

  //filtroProvincias: any;
  selectedProvincia: any = 1;

  //filtroLocalidades: any;
  selectedLocalidad: any = 1402;

  pickerFiltroDesde: any = null;
  pickerFiltroHasta: any = null;
  pickerLoteDesde: any   = null;
  pickerLoteHasta: any   = null;


  filtroLote: FiltroLote ={
    idTipo      : null,
    idTurno     : null,
    idOrigen    : null,
    idEtapa     : null,
    idProvincia : null,
    idLocalidad : null,
    desdePedido : null,
    hastaPedido : null,
    idLote        : null
  };
  
  productos: any [] = [];
  loteActual: any = {}; */

  constructor(
    private _verComprobanteService: VerComprobanteService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this._activatedRoute.params.subscribe( params => {

      console.log("nro Comprobante -> ", params['id']);
      this.nroComprobante = params['id'];
    });
    
    this.getPedidosDeComprobante();
  }
  
  getPedidosDeComprobante(  ){
    let body = {
      "idTipo" : 1,
      "idTurno" : null,
      "idOrigen" : null,
      "idEtapa" : null,
      "idProvincia" : 1,
      "idLocalidad" : null,
      "desdePedido" : null,
      "hastaPedido" : "null",
      "idLote" : null
    };

    this._verComprobanteService.getPedidosDeComprobante( body, this.nroComprobante, this.page, this.size, this.columna, this.order ) 
      .subscribe( data => {
        this.dataSource2 = data.datos;
        console.log("pedido  -> ", this.dataSource2);
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
          let titulo = 'Error al listar los pedidos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  /* @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.page = 0;
    this.columna = 'id';

    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
  } */

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
