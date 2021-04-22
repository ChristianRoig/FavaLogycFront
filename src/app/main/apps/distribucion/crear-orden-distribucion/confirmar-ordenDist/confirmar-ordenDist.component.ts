import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

//service
import { ConfirmarOrdenDeDistribucionService } from './confirmar-ordenDist.service';

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

export interface BodyRemito {
  idTransporte: number,
  idDeposito: number,
  idTalonario: number,
  listaIdDetalle: number []
}

@Component({
  selector: 'app-confirmar-ordenDist',
  templateUrl: './confirmar-ordenDist.component.html',
  styleUrls: ['./confirmar-ordenDist.component.scss']
})

export class ConfirmarOrdenDeDistribucionComponent implements OnInit {

  dataSource2: any;
  
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array();
  cantRemitos: number = 0;
  nombreOrden: string = "Mi dist";
  datosOrden: {} = {};
  estoyEditando: boolean = false;
  nombreBoton: string = "Crear";

  filtroTransportes: any;
  selectedTransporte: any = 0;

  filtroLocalidades: any;
  selectedLocalidad: any = 0;

  filtroTurnos: any;
  selectedTurno: any = 0;

  constructor(public matDialogRef: MatDialogRef<ConfirmarOrdenDeDistribucionComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private _confirmarOrdenDeDistribucionService: ConfirmarOrdenDeDistribucionService,
              private _dialog: MatDialog,
              private _router: Router) { }

  ngOnInit(): void {
    this.getfiltros();
    console.log("llegué acá");
    if(this.data.vengoDeCrear == true){
      console.log("vengo de crear orden");
      this.toAdd = this.data.selection._selected;
      this.cantRemitos = this.data.selection._selected.length;
    }
    if (this.data.vengoDeOrden == true){
      console.log("vengo de ver orden", this.data.selection);
      this.datosOrden = this.data.selection;
      console.log("vengo de ver orden", this.datosOrden);
      this.setearValores();
    }
    localStorage.clear();
  }

  crearOrden( accion: string ){

    //queda hacer el mandar el update de actualizarOrden() y ver si existe el servicio
    if(accion === "Actualizar"){
      console.log("accion ->", accion);
      this.actualizarOrden();
    }
    else{
      let seleccionados = [];
  
      for (let i = 0; i < this.toAdd.length; i++){
        seleccionados.push(this.toAdd[i].id);
      }
  
      let body = { 
        nombre : "Mi dist",
        idTurno        : this.selectedTurno,
        idTransporte   : this.selectedTransporte,
        idLocalidad    : this.selectedLocalidad,
        listaId        : seleccionados
      }
      
      console.log("body que mando", body);
      this._confirmarOrdenDeDistribucionService.crearOrdenDeDistribucion( body ).subscribe( params => {
        console.log("entró");
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
            let titulo = 'Error al crear la orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      });
      setTimeout(() => {                          
        this.navegarAlistaOrdenes();
      }, 1000);
    }
  }

  actualizarOrden(){}

  navegarAlistaOrdenes(){
    let ruta = `apps/distribucion/ordenes-distribucion`;
      this._router.navigate([ruta]);
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

  setearValores(){
    this.estoyEditando = true;
    this.nombreBoton = "Actualizar";
    this.selectedTransporte = this.data.selection.transporte;
    this.selectedLocalidad = this.data.selection.localidad;
    this.selectedTurno = this.data.selection.turno;
    this.cantRemitos = this.data.selection.cantRemitos;
    this.nombreOrden = this.data.selection.nombre;
    console.log("estoy editando", this.estoyEditando);
    console.log(" this.selectedTransporte",  this.selectedTransporte, " this.selectedLocalidad", this.selectedLocalidad,
    " this.selectedTurno",  this.selectedTurno);
  }
  /* cantArticulos: 1
      cantArticulosACargar: 1
      cantRemitos: 1
      estado: "NUEVO"
      fecha: "20/04/2021 20:48:45"
      id: 3
      localidad: "MAR DEL PLATA"
      nombre: "Mi dist"
      transporte: "OCA"
      turno: "MAÑANA" */

  getfiltros(){
    this._confirmarOrdenDeDistribucionService.getAllTransportes().subscribe(params => {
      this.filtroTransportes = params.datos;
      console.log("this.filtroTransportes", this.filtroTransportes);
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
    this._confirmarOrdenDeDistribucionService.getAllTurnos().subscribe(params => {
      this.filtroTurnos = params.datos;
      console.log("this.filtroTurnos", this.filtroTurnos);
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
    this._confirmarOrdenDeDistribucionService.getAllLocalidades().subscribe(params => {
      this.filtroLocalidades = params.datos;
      console.log("this.filtroLocalidades", this.filtroLocalidades);
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

  selectTransporte(event: Event) {
    this.selectedTransporte = (event.target as HTMLSelectElement).value;
    console.log("this.selectedTransporte",this.selectedTransporte);
  }

  selectTurno(event: Event) {
    this.selectedTurno = (event.target as HTMLSelectElement).value;
    console.log("this.selectedTurno",this.selectedTurno);
  }

  selectLocalidad(event: Event) {
    this.selectedLocalidad = (event.target as HTMLSelectElement).value;
    console.log("this.selectedLocalidad",this.selectedLocalidad);
  }


}
