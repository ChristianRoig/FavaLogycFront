import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

//service
import { ConfirmarOrdenDeDistribucionService } from './confirmar-ordenDist.service';
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

  @ViewChild('nombreOrdenDist') nombreOrdenDistInput: ElementRef;
  dataSource2: any;
  
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array();
  cantRemitos: number = 0;
  nombreOrden: string = "";
  idOrden: number ;
  datosOrden: {} = {};
  ordenActual = {};
  estoyEditando: boolean = false;
  nombreBoton: string = "Crear";
  contador: number = 0;
  mostrarSpinner: boolean = false;

  localidadDefault: any = 1402;

  filtroTransportes: any;
  selectedTransporte: any = 0;

  filtroTurnos: any;
  selectedTurno: any = 1;

  constructor(public matDialogRef: MatDialogRef<ConfirmarOrdenDeDistribucionComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private _confirmarOrdenDeDistribucionService: ConfirmarOrdenDeDistribucionService,
              private _dialog: MatDialog,
              private _router: Router) { }

  ngOnInit(): void {
    this.getfiltros();
    

    if(this.data.vengoDeCrear == true){
      console.log(this.data.selection._selected);
      this.toAdd = this.data.selection._selected;
      console.log("vengo de crear orden");
      console.log("toAdd", this.toAdd);
      this.localidadDefault = this.toAdd[0].pedidoDetalles[0].pedidoDomicilioEntrega.sysLocalidad;
      
      console.log( "this.localidadDefault", this.localidadDefault.id );
      this.cantRemitos = this.data.selection._selected.length;
    }
    if (this.data.vengoDeOrden == true){

      console.log("vengo de ver orden", this.data.selection);
      
      console.log("this.data.ordenActual |", this.data.ordenActual);
      this.ordenActual = this.data.ordenActual;
      console.log("ordenActual |", this.ordenActual);
      this.idOrden = this.data.ordenActual.id;
      this.nombreOrden = this.data.ordenActual.nombre;
      //this.selectedTransporte = this.data.ordenActual;
      //this.datosOrden = this.data.selection; //no se usa
      //console.log("vengo de ver orden", this.datosOrden);
      this.setearValores();
      //this.getOrdenById();
    }
    localStorage.clear();
  }

  crearOrden( accion: string ){
    this.contador++;
    this.mostrarSpinner = true;
    console.log("this.contador", this.contador);
    //queda hacer el mandar el update de actualizarOrden() y ver si existe el servicio
    if ( accion === "Actualizar" ){
      console.log("accion ->", accion);
      this.actualizarOrden();
    }
    else{
      if ( this.contador == 1 ){

        let seleccionados = [];
    
        for (let i = 0; i < this.toAdd.length; i++){
          seleccionados.push(this.toAdd[i].id);
        }
    
        let body = { 
          nombre         : this.nombreOrdenDistInput.nativeElement.value,
          idTurno        : this.selectedTurno,
          idTransporte   : this.selectedTransporte,
          idLocalidad    : 1402,
          listaId        : seleccionados
        }
        
        console.log("body que mando", body);
        this._confirmarOrdenDeDistribucionService.crearOrdenDeDistribucion( body ).subscribe( params => {
          console.log("entró");
          this._dialog.closeAll();
          this.esperarYnavegar();
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
      }
    }
  }

  esperarYnavegar(){
    
    setTimeout(() => {                          
      this.navegarAlistaOrdenes();
    }, 1000);
  }


  searchNombreOrden(){
    this.nombreOrden = this.nombreOrdenDistInput.nativeElement.value;
    console.log(this.nombreOrden);
    if (this.nombreOrden == '' || this.nombreOrden == null ){
      this.nombreOrden = null;
    }
  }

  actualizarOrden(){
    if ( this.contador == 1 ){

      let body = { 
        nombre         : this.nombreOrden,
        idTurno        : this.selectedTurno,
        idTransporte   : this.selectedTransporte
      }
  
      console.log("body", body, "idOrden", this.idOrden);
      
      this._confirmarOrdenDeDistribucionService.actualizarOrdenDistribucion( this.idOrden, body ).subscribe( params => {
        console.log("se actualizaron los datos con éxito");
        this._dialog.closeAll();
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
            let titulo = 'Error al actualizar la orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      });
    }
  }

  getOrdenById(){
    console.log(this.idOrden);
    this._confirmarOrdenDeDistribucionService.getOrdenById( this.idOrden ).subscribe( data => {
       console.log( {data} );
/* 
       this.ordenActual = this.data.ordenActual;
      this.idOrden = this.data.ordenActual.id;
      this.nombreOrden = this.data.ordenActual.nombre; */
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
          let titulo = 'Error al actualizar la orden';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

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
      //falta setear el idOrden acá
    this.estoyEditando = true;
    this.nombreBoton = "Actualizar";
    this.selectedTransporte = this.data.ordenActual.sysTransporte.id;
    this.selectedTurno = this.data.ordenActual.pedidoTurno.id;
    this.cantRemitos = this.data.ordenActual.remitos.length;
    this.nombreOrden = this.data.ordenActual.nombre;
    this.idOrden = this.data.ordenActual.id;
    console.log("estoy editando", this.estoyEditando);
    console.log(" this.selectedTransporte",  this.selectedTransporte, " this.selectedTurno",  this.selectedTurno);
  }

  //@Debounce(1000)
  setNombreOrden() {
    let valorInput = this.nombreOrdenDistInput.nativeElement.value;
    if( valorInput == "" || valorInput == null ){
      this.nombreOrden = null;
    } 
    else
      this.nombreOrden = valorInput;
  }

  getfiltros(){
    this._confirmarOrdenDeDistribucionService.getAllTransportes().subscribe(params => {
      this.filtroTransportes = params.datos;
      //console.log("this.filtroTransportes", this.filtroTransportes);
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
      //console.log("this.filtroTurnos", this.filtroTurnos);
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




}
