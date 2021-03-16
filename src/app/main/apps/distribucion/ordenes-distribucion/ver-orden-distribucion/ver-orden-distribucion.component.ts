import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

//componentes
import { ModalConfirmacionBorrarComponent } from './modal-confirmacion-borrar/modal-confirmacion-borrar.component';

//servicios
import { VerOrdenDistribucionService } from './ver-orden-distribucion.service';

export interface Remito{
  id: number;
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
  
  displayedColumns: string[] = ['select', 'id', 'codComprobante', 'nroComprobante', 'fechaAlta', 'cantArticulos'];
  selection = new SelectionModel<any>(true, []);
  dataSource2: any;

  idOrdenDist: number = null;
  nombreOrden: string = null;
  remitosDeOrden: [Remito] = null;
  resultObject: [any] = null;

  busqueda: number = null;
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'nroCbte';
  order: string = 'asc';

  mensaje: string;
  titulo: string;
  editRemito: boolean;
  mostrarRemitos: boolean = false;
  textoBtnAddRemitos: string = "Agregar Remitos";

  constructor(
    private _verOrdenDistribucion: VerOrdenDistribucionService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.editRemito = false;
    this._activatedRoute.params.subscribe( params => {
      this.idOrdenDist = params['id'];
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
          let titulo = 'Error al listar remitos de orden ' + this.idOrdenDist;
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  } 

  confirmacionBorrar() {
    const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent, { 
      data: {
        id: this.idOrdenDist
      } 
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if ( result )
          this.eliminarOrdenDeDistribucion()
      });  
  }

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
      if(remito.id == id)
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
    this.getAllRemitosSinOrden();
  }

  eliminarOrdenDeDistribucion(){
    console.log("se eliminará la orden -> ", this.idOrdenDist );
    this._verOrdenDistribucion.eliminarOrdenDeDistribucion( this.idOrdenDist ) .subscribe( data => {
      console.log("hecho");
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
          let titulo = 'Error al eliminar la orden '+ this.idOrdenDist;
          let mensaje = " ";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });

    setTimeout(() => {                          
      let ruta = `apps/distribucion/ordenes-distribucion`;
      this._router.navigate([ruta]);
      }, 1000);
  }

  remitoYaEstaEnOrden(remitoBuscado){
    //console.log("this.remitosDeOrden",this.remitosDeOrden.length);
    //for(let remito of this.remitosDeOrden){
    for(let i = 0; i < this.remitosDeOrden.length ; i++){
      //console.log("remito.idRemito", this.remitosDeOrden[i].id);
      //console.log("remitoBuscado.id", remitoBuscado.id);
      if(this.remitosDeOrden[i].id == remitoBuscado.id){
        return true;
      }
    } 
    return false;
  }

  getRemitoPorId(){
    let resultado: any = [];
    //console.log("busqueda", this.busqueda);
    this._verOrdenDistribucion.getRemitoPorId( this.busqueda ).subscribe( data => {
      if(this.mostrarRemitos == true){
        //console.log( data );
        //console.log("mostrarRemitos true",this.dataSource2);
        resultado.push( data );
        this.dataSource2 = resultado;
      } else{
        if(this.remitoYaEstaEnOrden(data)){
          resultado.push( data );
          this.dataSource2 = resultado;
          //console.log("remitoYaEstaEnOrden",this.dataSource2);
        }
      } 
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
          let mensaje = "El remito no pertenece a la orden o no existe";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  @Debounce(50)  
  searchRemito() {
    this.busqueda = this.buscarCbteInput.nativeElement.value;
    console.log(this.busqueda);
    if( this.busqueda < 1 ){
      this.busqueda = null;
      if(this.mostrarRemitos == true)
        this.getAllRemitosSinOrden();
      else
        this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
    }
  }

  eliminarRemitoDeOrden(){   // NO ANDA --> REVISAR
    let listaIdRemitos: Array<number> = new Array<number>();

    for (let entry of this.selection.selected) {
      listaIdRemitos.push(entry.id);
    }
    console.log(listaIdRemitos);

    this._verOrdenDistribucion.postEliminarRemitoDeOrden( listaIdRemitos ).subscribe(params => {
      console.log("eliminado ");
      this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
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
          let titulo = 'Error al eliminar remito de la orden '+ this.idOrdenDist;
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });

    setTimeout(() => {                          
      this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
      }, 1000);
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
            this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
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
    
    this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
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
