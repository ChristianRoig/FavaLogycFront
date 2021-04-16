import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

//componentes
import { VerImpresorasComponent } from '../ver-impresoras/ver-impresoras.component';
import { ModalConfirmacionBorrarComponent } from './modal-confirmacion-borrar/modal-confirmacion-borrar.component';
//servicios
import { VerLoteService } from './ver-lote.service';

export interface FiltroLote{
  idTipo : number;
  idTurno : number;
  idOrigen : number;
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  idLote : number;
}

@Component({
  selector: 'app-ver-lote',
  templateUrl: './ver-lote.component.html',
  styleUrls: ['./ver-lote.component.scss']
})


export class VerLoteComponent implements OnInit {
  
  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;

  displayedColumns: string[] = ['select', 'codigoArticulo', 'nombreArticulo', 'etapa', 'comprobante'];
  selection = new SelectionModel<any>(true, []);
  dataSource2: any;

  idLote: number = null;
  lote: string = null;
  nombreLote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'idDetalle';
  order: string = 'asc';

  mensaje: string;
  titulo: string;
  editLote: boolean;
  

  //filtroTipos: any;
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
  loteActual: any = {};

  constructor(
    private _verLoteService: VerLoteService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    //console.log("ver-lote component");
    this.editLote = false;
    //this.nombreLote = "Nombre lote";
    //this.loteActual = lote;
    this._activatedRoute.params.subscribe( params => {
      //console.log( params['id'] );
      this.idLote = params['id'];
      this.getLote( params['id'] );
      console.log("id lote -> ", params['id']);
      this.getArticulosDeLote( params['id'] );
    });
  }
  
  getArticulosDeLote(idLote: number){
    this.filtroLote.idLote = idLote;
    //this.dataSource2 = ELEMENT_DATA;
    this._verLoteService.getArticulosDeLote( this.filtroLote, this.busqueda, this.columna, this.order ) .subscribe( data => {
      this.dataSource2 = data.datos;

      console.log("articulos -> ", this.dataSource2);
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
          let titulo = 'Error los articulos del lote';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getLote(idLote: number){                                              //Propuesta de getLote PARA OBTENER Y MODIFICAR EL NOMBRE DE LOTE  
    this._verLoteService.getLote( idLote ) .subscribe( data => {
      console.log(data);
      this.loteActual = data;
      this.nombreLote = this.loteActual.nombre;
      this.idLote = this.loteActual.idLote;
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
          let titulo = 'Error al obtener el lote';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  editarLote(){
    this.editLote = true;
  }

  actualizarNombreLote(nombreLoteInput: string){

    console.log(nombreLoteInput);
    if(nombreLoteInput != ''){
      this.loteActual.nombreLote = nombreLoteInput;
      this.nombreLote = nombreLoteInput;
    }
    this.editLote = false;

    this._verLoteService.updateNombreLote(this.loteActual.nombreLote, this.loteActual.idLote) .subscribe (data =>  {

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
          let titulo = 'Error al actualizar el nombre';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  confirmacionBorrar() {
    const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent, { 
      data: {
        id: this.loteActual.idLote,
        nombre: this.nombreLote,
        /* codigoArticulo: this.codigoArticulo,
        codigoDeBarras: codigoDeBarras, 
        descripcion: descripcion */
      } 
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if ( result )
          this.eliminarLote()
      }); 
  }

  eliminarLote(){
    console.log("se eliminará el lote -> ", this.idLote );
    this._verLoteService.eliminarLote( this.idLote ) .subscribe( data => {
      console.log("se eliminará el lote -> ", this.idLote );
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
          let titulo = 'Error al eliminar lote';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    }); 
    this.esperarYnavegar();
  }

  esperarYnavegar(){
    setTimeout(() => {                          
      let ruta = `apps/lotes/lista-lotes`;
      this._router.navigate([ruta]);
    }, 1000);
  }
  

  sacarDelLote(){
    let listaIdPedidoDetalle: Array<number> = new Array<number>();

    for (let entry of this.selection.selected) {
      listaIdPedidoDetalle.push(entry.id);
    }
    console.log(listaIdPedidoDetalle);
    
    this._verLoteService.postEliminarArticuloDeLote(listaIdPedidoDetalle).subscribe(params => {
      console.log("termino Ok");
      this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
    this.getArticulosDeLote(this.idLote);
  }

  getDetalle(busqueda, page, size, columna, order){
    let idTipo      :number =null;
    let idTurno     :number =null;
    let idOrigen    :number =null;
    let idEstado    :number =null;
    let idEtapa     :number =null;
    let idProvincia :number =null;
    let idLocalidad :number =null;
    let desdePedido :string =null;
    let hastaPedido :string =null;
    let idLote      :number =null;
    let desdeLote   :string =null;
    let hastaLote   :string =null;
    this.selection.clear();

    if (this.selectedTipo > 0 )
      idTipo = this.selectedTipo;
    
    if (this.selectedTurno > 0 )
      idTurno = this.selectedTurno;
    
    if (this.selectedOrigen > 0 )
      idOrigen = this.selectedOrigen;
    
    if (this.selectedEstado > 0 )
      idEstado = this.selectedEstado;
    
    if (this.selectedEtapa > 0 )
      idEtapa = this.selectedEtapa;
    
    if (this.selectedProvincia > 0 )
      idProvincia = this.selectedProvincia;
    
    if (this.selectedLocalidad > 0 )
      idLocalidad = this.selectedLocalidad;
    
    if (this.pickerFiltroDesde)
      desdePedido = this.pickerFiltroDesde;
    
    if (this.pickerFiltroHasta)
      hastaPedido = this.pickerFiltroHasta;
    
    if (this.idLote !== null)
      idLote = this.idLote;
    
    if (this.pickerLoteDesde)
      desdeLote = this.pickerLoteDesde;	
    
    if (this.pickerLoteHasta)
      hastaLote = this.pickerLoteHasta;

    this.filtroLote.idTipo      = idTipo;
    this.filtroLote.idTurno     = idTurno;
    this.filtroLote.idOrigen    = idOrigen;
    this.filtroLote.idEtapa     = idEtapa;
    this.filtroLote.idProvincia = idProvincia;
    this.filtroLote.idLocalidad = idLocalidad;
    this.filtroLote.desdePedido = desdePedido;
    this.filtroLote.hastaPedido = hastaPedido;
    this.filtroLote.idLote      = idLote;
    
    // console.log(this.filtroLote);

    this._verLoteService.getArticulosDeLote(this.filtroLote, busqueda, columna, order).subscribe(
      data => {
        // console.log(data)
        this.lote = data.datos;
        this.length = data.totalRegistros;
      },
      (err: HttpErrorResponse) => {
        this.length = 0;
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al listar';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            // this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
  }

  @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.page = 0;
    this.columna = 'id';

    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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

            this.resetFiltros();
            // this.getfiltros();
            // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  imprimirCupa(){

    let application_name = "Favalogyc";
    let permission_name = "Impresion_CUPA"

    // let res = await this._usuarioService.checkPermision(application_name, permission_name);
    console.log('component')
    // console.log(res)
    // if (res === false){
    //   this.mostrarError(1, 'Error de Permisos', `Usted no tiene permisos para realizar la acción: ${permission_name}.`);
    // } else {
      if(localStorage.getItem('ImpresoraCUPA')){
        this.imprimir();
      } else {
        this.seleccionarImpresora()
      }
  }

  resetFiltros(){

    this.busqueda = ""
    this.page = 0;
    this.size = 10;
    this.columna = 'idDetalle';
    this.order = 'asc';

    this.busqueda = "";
    this.selectedTipo = 0;
    this.selectedTurno = 0;
    this.selectedOrigen = 0;
    this.selectedEtapa = 0;
    this.selectedProvincia = 1;
    this.selectedLocalidad = 1402;
    this.pickerFiltroDesde= null;
    this.pickerFiltroHasta= null;
    
    
    // this.buscarLoteInput.nativeElement.value = '';
    this.buscarCbteInput.nativeElement.value = '';
  }

  seleccionarImpresora(){
    let dialogRef = this._dialog.open(VerImpresorasComponent, {
      data: {
        pedidos: this.selection,
        impresora: 'ImpresoraCUPA'
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if(localStorage.getItem('ImpresoraCUPA')){
          this.imprimir();
        } else {
          dialogRef.close();
          this.seleccionarImpresora();
        }
      });
  }

  imprimir(){
    let impresora = localStorage.getItem('ImpresoraCUPA');

    this._verLoteService.imprimir(this.idLote,impresora).subscribe(data => {
      
      let titulo = 'Estado de impresión';
      let mensaje = "Completado correctamente";
      this.mostrarError(-1, titulo, mensaje);
      this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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
          let titulo = 'Error al imprimir';
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
    
    this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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
