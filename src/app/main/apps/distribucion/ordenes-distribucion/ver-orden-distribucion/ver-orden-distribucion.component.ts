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
import { VerOrdenDistribucionService } from './ver-orden-distribucion.service';


export interface Remito{
  //'id', 'codComprobante', 'nroComprobante', 'fechaAlta', 'cantArticulos'
  idRemito: number;
  codComprobante: number;
  nroComprobante: string;
  fechaAlta: Date;
  cantArticulos: number;

}

@Component({
  selector: 'app-ver-orden-distribucion',
  templateUrl: './ver-orden-distribucion.component.html',
  styleUrls: ['./ver-orden-distribucion.component.scss']
})


export class VerOrdenDistribucionComponent implements OnInit {
  
  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  
  displayedColumns: string[] = ['select', 'id', 'codComprobante', 'fechaAlta', 'cantArticulos'];
  selection = new SelectionModel<any>(true, []);
  dataSource2: any;

  idOrdenDist: number = null;
  nombreOrden: string = null;
  remitosDeOrden: [Remito] = null;

  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'nroCbte';
  order: string = 'asc';

  mensaje: string;
  titulo: string;
  editLote: boolean;
  mostrarRemitos: boolean = false;
  textoBtnAddRemitos: string = "Agregar Remitos";
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
  

  constructor(
    private _verOrdenDistribucion: VerOrdenDistribucionService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.editLote = false;

    this._activatedRoute.params.subscribe( params => {
      this.idOrdenDist = params['id'];
      //this.getLote( params['id'] );
      console.log("id orden -> ", this.idOrdenDist);
    });

    this.getRemitosDeOrdenDistribucion(this.idOrdenDist);
  }
  
  getRemitosDeOrdenDistribucion (idOrdenDist: number) {
    this._verOrdenDistribucion.getRemitosDeOrdenDistribucion( idOrdenDist ) .subscribe( data => {
      console.log(data.remitos);
      this.remitosDeOrden = data.remitos;
      this.dataSource2 = data.remitos;
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

  editarOrden(){
    this.editLote = true;
  }

  actualizarNombreOrden(nombreLoteInput: string){

    /* console.log(nombreLoteInput);
    if(nombreLoteInput != ''){
      this.loteActual.nombreLote = nombreLoteInput;
      this.nombreLote = nombreLoteInput;
    }
    this.editLote = false;

    this._verOrdenDistribucion.updateNombreLote(this.loteActual.nombreLote, this.loteActual.idOrdenDist) .subscribe (data =>  {

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
    }); */
  }

  confirmacionBorrar() {
    /* const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent, { 
      data: {
        id: this.loteActual.idOrdenDist,
        nombre: this.nombreLote,
      } 
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if ( result )
          this.eliminarOrdenDeDistribucion()
      });  */
  }

  /* toggleActivarRemitos(){
    this.mostrarRemitos = !this.mostrarRemitos;
    console.log(this.mostrarRemitos);
  } */

  activarAgregarRemitos(){
    this.mostrarRemitos = !this.mostrarRemitos;
    console.log(this.mostrarRemitos);
    if(this.mostrarRemitos == true){
      this.textoBtnAddRemitos = "Finalizar";
      this.displayedColumns = ['id', 'codComprobante', 'fechaAlta', 'cantArticulos', 'accion'];
      this.getAllRemitosSinOrden();
    }
    if(this.mostrarRemitos == false){
      this.textoBtnAddRemitos = "Agregar Remitos";
      this.displayedColumns = ['select', 'id', 'codComprobante', 'fechaAlta', 'cantArticulos'];
      this.getRemitosDeOrdenDistribucion(this.idOrdenDist);
    }
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  getAllRemitosSinOrden( ){
    this._verOrdenDistribucion.getRemitosSinDistribucion( this.page, this.size, this.columna, this.order ) .subscribe( data => {
      console.log(data);
      let resultado = [];
      for(let elem of data.datos){
        if(!this.existeEnELRemito(elem.id)){
          resultado.push(elem);
        }
      }
      
      this.dataSource2 = resultado;
      console.log( this.dataSource2 );
      this.length = data.totalRegistros;
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
          let titulo = 'Error al listar remitos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  existeEnELRemito( id: number ){
    for(let remito of this.remitosDeOrden){
      if(remito.idRemito == id)
        return true;
      else
        return false;  
    }
  } 
  
  addRemitosAorden( remito ) {
    let idRemito = remito.id;
    
    console.log(idRemito);
    this._verOrdenDistribucion.addRemitosAorden( idRemito, this.idOrdenDist ) .subscribe( data => {
      console.log("remitos añadidos");
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
          let titulo = 'Error al agregar remitos a la orden';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  eliminarOrdenDeDistribucion(){
    console.log("se eliminará el lote -> ", this.idOrdenDist );
    this._verOrdenDistribucion.eliminarOrdenDeDistribucion( this.idOrdenDist ) .subscribe( data => {
      console.log("se eliminará el lote -> ", this.idOrdenDist );
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
    let ruta = `apps/distribucion/ordenes-distribucion`;
    this._router.navigate([ruta]);
  }

  sacarRemitoDeOrden(){
    let listaIdRemitos: Array<number> = new Array<number>();

    for (let entry of this.selection.selected) {
      listaIdRemitos.push(entry.id);
    }
    console.log(listaIdRemitos);
    
    this._verOrdenDistribucion.postEliminarArticuloDeLote( listaIdRemitos ).subscribe(params => {
      console.log("termino Ok");
      //this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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
    //this.getRemitosDeOrdenDistribucion(this.idOrdenDist);
  }

 /*getDetalle(busqueda, page, size, columna, order){
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

    this.body.idTipo      = idTipo;
    this.body.idTurno     = idTurno;
    this.body.idOrigen    = idOrigen;
    this.body.idEtapa     = idEtapa;
    this.body.idProvincia = idProvincia;
    this.body.idLocalidad = idLocalidad;
    this.body.desdePedido = desdePedido;
    this.body.hastaPedido = hastaPedido;
    this.body.idLote      = idLote;
    
    // console.log(this.body);

    this._verOrdenDistribucion.getArticulosDeLote(this.body, busqueda, columna, order).subscribe(
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
  } */

  @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;
    this.page = 0;
    this.columna = 'id';

    //this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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

  /* imprimir(){
    let impresora = localStorage.getItem('ImpresoraCUPA');

    this._verOrdenDistribucion.imprimir(this.idOrdenDist,impresora).subscribe(data => {
      
      let titulo = 'Estado de impresión';
      let mensaje = "Completado correctamente";
      this.mostrarError(-1, titulo, mensaje);
      //this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
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
  } */
  
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
