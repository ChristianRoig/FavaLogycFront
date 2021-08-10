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
  idOrden: number;
  datosOrden: {} = {};
  ordenActual = {};
  estoyEditando: boolean = false;
  nombreBoton: string = "Crear";
  contador: number = 0;
  mostrarSpinner: boolean = false;
  nuevaFecha: boolean = false;
  cantTurnosManiana: number = 0;
  cantTurnosTarde: number = 0;
  pdfOrdenUrl: string;

  localidadDefault: any = 1402;

  filtroTransportes: any;
  selectedTransporte: any = null;

  filtroTurnos: any;
  selectedTurno: any = 1;

  filtroFechasDeEntregaExistentes: any;
  selectedFecha: string = null;


  minDateHastaOrden: Date;
  maxDateHastaOrden: Date;

  pickerFechaEntregaOrden: any   = null;


 constructor( public matDialogRef: MatDialogRef<ConfirmarOrdenDeDistribucionComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private _confirmarOrdenDeDistribucionService: ConfirmarOrdenDeDistribucionService,
              private _dialog: MatDialog,
              private _router: Router) {

              }

  ngOnInit(): void {
  
    if (this.data.vengoDeCrear == true) {
      console.log(this.data.selection._selected);
      this.toAdd = this.data.selection._selected;
      console.log("vengo de crear orden");
      console.log("toAdd", this.toAdd);
      this.localidadDefault = this.toAdd[0].pedidoDetalles[0].pedidoDomicilioEntrega.sysLocalidad;
      
      console.log( "this.localidadDefault", this.localidadDefault.id );
      this.cantRemitos = this.data.selection._selected.length;
    }
    if (this.data.vengoDeOrden == true) {

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
    //localStorage.clear();
    this.setMaxAndMinFechaSeleccion();
    this.getfiltros();
  }



  crearOrden( accion: string ) {
    this.contador++;
    this.mostrarSpinner = true;
    console.log("this.contador", this.contador);
    //queda hacer el mandar el update de actualizarOrden() y ver si existe el servicio
    if ( accion === "Actualizar" ){
      console.log("accion ->", accion);
      this.actualizarOrden();
    }
    else {
      if ( this.contador == 1 ) {

        let seleccionados = [];
    
        for (let i = 0; i < this.toAdd.length; i++){
          seleccionados.push(this.toAdd[i].id);
        }
    
        let body = { 
          nombre             : this.nombreOrdenDistInput.nativeElement.value,
          idTurno            : this.selectedTurno,
          idTransporte       : this.selectedTransporte,
          fechaEntregaEnvio  : this.selectedFecha,
          listaId            : seleccionados
        }
        
        console.log("body que mando", body);
        this._confirmarOrdenDeDistribucionService.crearOrdenDeDistribucion( body ).subscribe( params => {
          console.log("entró", params);
          this.pdfOrdenUrl = params;
          this.imprimirOrdenDistribucion();
          this._dialog.closeAll();
          this.esperarYnavegar();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error");
            this.matDialogRef.close();
          } else {
            let errStatus = err.status
            if (errStatus == 0){
              let titulo = 'Error de Servidor';
              let mensaje = "Por favor comunicarse con Sistemas";
              this.mostrarError(errStatus, titulo, mensaje);
              this.matDialogRef.close();
            } else {
              let titulo = 'Error al crear la orden';
              let mensaje = err.error.message.toString();
              this.mostrarError(errStatus, titulo, mensaje);
              this.matDialogRef.close();
            }
          }
        });
      }
    }
  }

  imprimirOrdenDistribucion(){
    window.open( this.pdfOrdenUrl, '_blank');
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
          this.matDialogRef.close();
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
            this.matDialogRef.close();
          } else {
            let titulo = 'Error al actualizar la orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
            this.matDialogRef.close();
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
    let ruta = `distribucion/ordenes-distribucion`;
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
    let listaIdDetalle: number [] = [];
    for( let elem of this.toAdd ){
      listaIdDetalle.push(elem.id);
    }
    let body = {
      "listaIdPedidoCbte": listaIdDetalle
    }

    this._confirmarOrdenDeDistribucionService.getAllTransportes( body ).subscribe(params => {
      this.filtroTransportes = params.datos;
      console.log("this.filtroTransportes", this.filtroTransportes);
      console.log( this.verificarCantPedidos() );
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

    this._confirmarOrdenDeDistribucionService.getAllTurnos( body ).subscribe(params => {
      this.filtroTurnos = params.datos;
      this.setearCantidadDeTurnos();
      this.setSelectedTurno();
      console.log("this.filtroTurnos", this.filtroTurnos);
      console.log("TURNO SELECCIONADO", this.selectedTurno );
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

    this._confirmarOrdenDeDistribucionService.getAllFechasDeEntregaExistentes( body ).subscribe(params => {
      this.filtroFechasDeEntregaExistentes = params.datos;
      console.log("FechasEntregaExistentes ->", params);
      this.selectedFecha = this.filtroFechasDeEntregaExistentes[0].fechaEntregaEnvio;
      //console.log("this.selectedFecha", this.selectedFecha);
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

  setearCantidadDeTurnos(){
    if (this.filtroTurnos) {

      if (this.filtroTurnos[0].cantidadPedido > 0 && this.filtroTurnos[0].id === 1 ){
        this.cantTurnosManiana = this.filtroTurnos[0].cantidadPedido;
      }
      if (this.filtroTurnos[0].cantidadPedido > 0 && this.filtroTurnos[0].id === 2 ){
        this.cantTurnosTarde = this.filtroTurnos[0].cantidadPedido;
      }
      if (this.filtroTurnos[1].cantidadPedido > 0 && this.filtroTurnos[1].id === 1 ){
        this.cantTurnosManiana = this.filtroTurnos[1].cantidadPedido;
      }
      if (this.filtroTurnos[1].cantidadPedido > 0 && this.filtroTurnos[1].id === 2 ){
        this.cantTurnosTarde = this.filtroTurnos[1].cantidadPedido;
      }
    }
  }

  setSelectedTurno(){
    if (this.cantTurnosManiana > 0 && this.cantTurnosTarde === 0){
      this.selectedTurno = 1;
    }
    if (this.cantTurnosManiana === 0 && this.cantTurnosTarde > 0){
      this.selectedTurno = 2;
    }
    console.log("this.selectedTurno", this.selectedTurno); 
  }
  verificarCantPedidos(): boolean{
    let contador: number = 0;
    for ( let elem of this.filtroTransportes ) {
      if (elem.cantidadPedido > 0) {
        this.selectedTransporte = elem.id;
        contador++;
        if (contador > 1){
          this.selectedTransporte = null;
          return true;
        }
      }
    }
    if (contador === 1){
      return true;
    }
    else {
      return false;
    }
  }

  selectFechaExistente(event: Event) {
    this.selectedFecha = (event.target as HTMLSelectElement).value;
    console.log("this.selectedFecha", this.selectedFecha);
  }

  selectTransporte(event: Event) {
    this.selectedTransporte = (event.target as HTMLSelectElement).value;
    console.log("this.selectedTransporte", this.selectedTransporte);
  }

  selectTurno(event: Event) {
    this.selectedTurno = (event.target as HTMLSelectElement).value;
    console.log("this.selectedTurno",this.selectedTurno);
  }

  addEvent( tipo, evento ) {

    if (evento.value) {
      /* ----------------- Para agregarle 0 adelante a mes y dia de un digito ---------------------- */
      let mes: string;
      let dia: string;
      if (evento.value._i.month < 10 && evento.value._i.month > 0 ){
        mes = "0"+ (evento.value._i.month + 1 );
      }
      else {
        mes = evento.value._i.month + 1;
      }
      if (evento.value._i.date < 10 && evento.value._i.date > 0 ){
        dia = "0" + evento.value._i.date;
      }
      else {
        dia = evento.value._i.date;
      }
      let fecha = evento.value._i.year+"-"+ mes +"-"+dia;
      console.log("tipo "+ tipo + ": " +fecha);
      /* ---------------------------------------------------------------------------------------- */
  
      switch (tipo) {
        case "pickerFechaEntregaOrden":
          this.pickerFechaEntregaOrden = fecha;
          this.selectedFecha = fecha;
          this.minDateHastaOrden = evento.value;
          break;
      }    
    }
  }

  setMaxAndMinFechaSeleccion(){
    const currentYear = new Date().getFullYear();
    this.minDateHastaOrden   = new Date(currentYear - 5, 0, 1);
    this.maxDateHastaOrden   = new Date(currentYear + 1, 11, 31);
  }

  activarNuevaFecha(){
    this.nuevaFecha = !this.nuevaFecha;
  }

  definirTurno(): boolean {
    if (this.cantTurnosManiana > 0 && this.cantTurnosTarde > 0 ){
      return true;
    } 
    else{
      return false;
    }
  }


}
