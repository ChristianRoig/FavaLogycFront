import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosListaService } from '../../x_NOSEUSA_pedidos-lista/pedidos-lista.service';
import { AgregarDatosEntregaService } from './agregar-datos-entrega.service';

export interface Articulo {
  idDetalleTango: number,
  codigoArticulo: string,
  codigoCliente: string,
  codigoDeBarras: string,
  nombreArticulo: string,
  nombreCliente: string,
  numeroCbte: string,
  tipoCbte: string
}

export interface ListaDatosDeEntrega {
  id: number,
  direccion: string,
  fechaDeEntrega: string,
  telefono: string,
  mail: string,
  contacto: string,
  observaciones: string,
  sysLocalidad: {
      id: number,
      sysProvincia: {
          id: number,
      }
  },
  sysTransporte: {
      id: number,
  },
  pedidoTurno: {
      id: number,
  },
  listaPedidoDetalle: Array <Articulo>
}

@Component({
  selector: 'app-agregar-datos-entrega',
  templateUrl: './agregar-datos-entrega.component.html',
  styleUrls: ['./agregar-datos-entrega.component.scss']
})
export class AgregarDatosEntregaComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<AgregarDatosEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pedidosListaService: PedidosListaService,
    private _agregarDatosEntregaService: AgregarDatosEntregaService,
    private _dialog: MatDialog,
    private _router: Router) {
      this.minDateHastaFiltro = new Date();
    }

    datoEntrega: ListaDatosDeEntrega ={
      id: null,
      direccion: null,
      fechaDeEntrega: null,
      telefono: null,
      mail: null,
      contacto: null,
      observaciones: null,
      sysLocalidad: {
          id: null,
          sysProvincia: {
              id: null,
          }
      },
      sysTransporte: {
          id: null,
      },
      pedidoTurno: {
          id: null,
      },
      listaPedidoDetalle: null,
    };

    minDateHastaFiltro: any;

    filtroProvincias: any;
    selectedProvincia: any;
    //provincia;

    filtroLocalidades: any;
    selectedLocalidad: any;
    nombreSelectedLocalidad: string;
  
    selectedCodigoPostal: any;

    filtroTurnos: any;
    selectedTurno: any = 0;

    filtroTransporte: any;
    selectedTransporte: any = 0;

    picker: any;
    valorPicker: any;
    codigoPostal: any = 7600;

    deshabilitado: boolean;

    contacto:string      = '';
    direccion:string     = '';
    mail:string          = '';
    observaciones:string = '';
    telefono:string      = '';

    mostrarDatos: boolean;
    fechaFormatoDate: Date;
    id: number = null;
    estanTodosLosDatos: boolean = false;
    localidadID: string = "7600";
    idProv: number = 1;
    crearDirec: boolean = false;
    indexLocalidad: number;

    ngOnInit(): void {

      switch (this.data.option) {
        case "add":
          this.selectedLocalidad = 1402; // 1402(Mar del plata) 
          this.deshabilitado = false;
          this.mostrarDatos = false;
          break;
        case "upd":
          this.deshabilitado = false;
          this.crearDirec = true;
          this.mostrarDatos = true;
          // permito la modificacion aunque los valores no se cambien, sino si o si hay que cambiar fecha ó turno ó transporte para poder actualizar
          this.estanTodosLosDatos = true; 
          this.getDatoEntrega();
          break;
          case "view":
            this.deshabilitado = true;
            this.crearDirec = true;
            this.mostrarDatos = true;
            this.getDatoEntrega();
          break;
      }
      console.log("this.indexLocalidad", this.indexLocalidad);
      this.getfiltros();
    } 


    onNoClick(): void {
      // this.dialogRef.close();
    }

    agregar(){

      this.datoEntrega.contacto                     = this.contacto;
      this.datoEntrega.direccion                    = this.direccion;
      this.datoEntrega.fechaDeEntrega               = this.picker;
      this.datoEntrega.id                           = this.id;
      this.datoEntrega.listaPedidoDetalle           = this.data.articulos;
      this.datoEntrega.mail                         = this.mail;
      this.datoEntrega.observaciones                = this.observaciones;
      this.datoEntrega.pedidoTurno.id               = this.selectedTurno;
      this.datoEntrega.sysLocalidad.id              = this.selectedLocalidad;
      this.datoEntrega.sysLocalidad.sysProvincia.id = this.selectedProvincia;
      this.datoEntrega.sysTransporte.id             = this.selectedTransporte;
      this.datoEntrega.telefono                     = this.telefono;

      console.log("THIS DATOS ENTREGA", this.datoEntrega);
      localStorage.setItem('datoEntrega', JSON.stringify(this.datoEntrega));
      localStorage.setItem('fechaFormatoDate', JSON.stringify(this.fechaFormatoDate));
      this.dialogRef.close();
    }

    controlarExistenDatos(){
      //console.log("this.picker - ", this.picker, " | ","this.selectedTurno - ", this.selectedTurno, " | ","this.selectedTransporte - ", this.selectedTransporte   );
      if( this.picker != undefined && this.selectedTurno != 0 ){
        if( this.selectedTransporte != 0 ){
          this.estanTodosLosDatos = true;  
        }
      }else{
        this.estanTodosLosDatos = false;  
      }
    }

    adaptarFecha(valor: string){
      //console.log("valor", valor);
      let stringFechaAdaptada: string = "";
      let dia:string = "";
      let mes:string = "";
      let anio:string = "";

      for(let i = 0; i < valor.length ; i++){
        //let caracter: string = valor[i];
        if(valor[i] != "-" && dia.length <= 1){
          dia += valor[i];
        }
        if (valor[i-1] === "-" && valor[i] != "-"){
          if (valor[i+1] === "-" || valor[i+2] === "-"){
            if (mes.length <= 1)
              mes += valor[i];
          }
        }
        if(dia.length >= 1 && mes.length >= 1){
          let yaEstoyEnAnio = false;
          if(valor[i-1] === "-"){
            yaEstoyEnAnio = true;
          }
          if((valor[i] != "-" && anio.length <= 3) && yaEstoyEnAnio== true){
            anio += valor[i];
          }
        }
      }
      //console.log("todo junto quedaria", dia,"|", mes, "|", anio)
      
      return stringFechaAdaptada;
    }

    getDatoEntrega() {

      this.indexLocalidad = +localStorage.getItem("indexLocalidad");
      console.log("| DATA | ->", this.data);
      //console.log("| selectedLocalidad | ->", this.data.item.sysLocalidad.id);
      this.fechaFormatoDate = JSON.parse(localStorage.getItem('fechaFormatoDate'));
      //console.log("fechaFormatoDate ACA", this.fechaFormatoDate);
  
      this.contacto             = this.data.item.contacto;
      this.direccion            = this.data.item.direccion;
      this.picker               = this.fechaFormatoDate;
      this.valorPicker          = this.fechaFormatoDate;
      this.data.articulos       = this.data.item.listaPedidoDetalle;
      this.mail                 = this.data.item.mail;
      this.id                   = this.data.item.id;
      this.observaciones        = this.data.item.observaciones;
      this.selectedTurno        = this.data.item.pedidoTurno.id;
      this.selectedLocalidad    = this.data.item.sysLocalidad.id;
      this.selectedProvincia    = this.data.item.sysLocalidad.sysProvincia.id;
      this.idProv               = this.data.item.sysLocalidad.sysProvincia.id;
      this.selectedTransporte   = this.data.item.sysTransporte.id;
      this.telefono             = this.data.item.telefono;
      
      console.log( this.selectedProvincia );
      console.log( this.selectedLocalidad );
      //console.log("LO QUE BUSCO", this.picker, "|",this.valorPicker, "|",this.data.item.fechaDeEntrega);
      //console.log(this.data.item.fechaDeEntrega, this.selectedTransporte, this.selectedTurno  );
    }

    devolverTurno(selectedTurno: number){
      if(selectedTurno == 1)
      return "Mañana";
      else
        return "Tarde";
    }

    devolverNombreTransporte( selectedTransporte: number ){
      if (selectedTransporte == 1)
          return "Sin Transporte";
      if (selectedTransporte == 2)
          return "Transporte Santulli";
      if (selectedTransporte == 3)
          return "OCA";
      if (selectedTransporte == 4)
          return "Manuel Gonzalez";
      if (selectedTransporte == 4)
          return "Transporte Santiago";
      if (selectedTransporte == 6)
          return "Juan Russo";
      if (selectedTransporte == 7)
          return "Tato Cejas";
      if (selectedTransporte == 8)
          return "Roberto Scagglia";
      if (selectedTransporte == 9)
          return "Daniel Bareille";
      if (selectedTransporte == 10)
          return "Santa Rita";
      if (selectedTransporte == 11)
          return "Interprovincial";
      if (selectedTransporte == 12)
          return "Expreso Pinamar";
      if (selectedTransporte == 13)
          return "Transporte Lojo";
      if (selectedTransporte == 14)
          return "Jorvic Express";
      if (selectedTransporte == 15)
          return "Otros";
      if (selectedTransporte == 16)
          return "Expreso Tandil";
      if (selectedTransporte == 17)
          return "Crevecoeur Oscar A. y Marcos O. S. de H.";
      if (selectedTransporte == 18)
          return "Raf";
      if (selectedTransporte == 19)
          return "Flete Service";
      if (selectedTransporte == 20)
          return "Flete Armador";
      if (selectedTransporte == 21)
          return "Andreani";
    }

    /* setLocalidadSeleccionada(){
      if ( this.mostrarDatos == true ){
        console.log("ESTOY ENTRANDO ACAAAAAAAAAAAAAAAAAAAAAAAAAA");
        this.nombreSelectedLocalidad = this.filtroLocalidades[this.data.item.sysLocalidad.id - 1].nombre;
        this.selectedLocalidad = this.filtroLocalidades[this.data.item.sysLocalidad.id - 1].id;
        console.log("this.nombreSelectedLocalidad", this.nombreSelectedLocalidad);
        console.log("this.selectedLocalidad", this.selectedLocalidad);
      }
    } */

    getfiltros(){

      this._agregarDatosEntregaService.getAllTurnos().subscribe(params => {
        this.filtroTurnos = params.datos;
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

      this._agregarDatosEntregaService.getAllTransportes().subscribe(params => {
        this.filtroTransporte = params.datos;
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

      this._agregarDatosEntregaService.getAllLocalidadesPorProvincia( this.idProv ).subscribe(params => {
        console.log(params);
        this.filtroLocalidades = params.datos;
        console.log(params.datos)
        //this.setLocalidadSeleccionada();
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

   
      this._agregarDatosEntregaService.getAllProvincias().subscribe( params => {
        console.log("PROVINCIAS -> ", params.datos);
        this.filtroProvincias = params.datos;
        if ( this.mostrarDatos == false ){
          console.log("estoy entrando aca aunque esta en falsooo");
          this.selectedProvincia = this.filtroProvincias[0].id;
          this._agregarDatosEntregaService.getAllLocalidadesPorProvincia( this.selectedProvincia );
        }
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
    };


    selectProvincia(event: Event) {
      this.selectedProvincia = (event.target as HTMLSelectElement).value;
      console.log("this.selectedProvincia", this.selectedProvincia);
      if(this.selectedProvincia > 0){
        //this.selectedLocalidad = 0;
        this._agregarDatosEntregaService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
          this.filtroLocalidades = params.datos;
          
          if (this.mostrarDatos === true) {
            this.selectedLocalidad = this.filtroLocalidades[0].id;
            console.log("this.selectedLocalidad", this.selectedLocalidad);
          }
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
      } else {
        this.selectedLocalidad = 0;
        this._agregarDatosEntregaService.getAllLocalidades().subscribe(params => {
          this.filtroLocalidades = params.datos;
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
    }
  
    selectLocalidad(event: Event) {

      this.selectedLocalidad = (event.target as HTMLSelectElement).value;
      this.indexLocalidad = (event.target as HTMLSelectElement).selectedIndex;
      console.log("indexLocalidad",  this.indexLocalidad);
      localStorage.setItem("indexLocalidad", this.indexLocalidad.toString());
      // this.selectedCodigoPostal = (event.target as HTMLSelectElement);
      console.log("localidad seleccionada ->", this.selectedLocalidad );

      this.localidadID = (event.target as HTMLSelectElement).value;
      
      //console.log("POSTAL:", this.getPostalxLocalidad( parseInt(this.localidadID) ) );

      if(this.selectedLocalidad > 0){
        this._agregarDatosEntregaService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
          console.log("provincia segun localidad -> ",params);
          //this.selectedProvincia = params.id;
          this.selectedProvincia = params.id;
          //console.log("Provincia: "+this.selectedProvincia.id);
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
    }

    getPostalxLocalidad( localidadID: number ){

      this.filtroLocalidades.forEach( (localidad: any) => {

        if ( localidad.id === localidadID ) {

          this.codigoPostal = localidad.codigoPostal;
        }

        
      });
      return this.codigoPostal;
    }

    selectTurno(event: Event) {
      this.selectedTurno = (event.target as HTMLSelectElement).value;
      //console.log(this.selectedTurno);
      this.controlarExistenDatos();
    }
    
    selectTransporte(event: Event) {
      this.selectedTransporte = (event.target as HTMLSelectElement).value;
      //console.log(this.selectedTransporte);
      this.controlarExistenDatos();
    }

    agregarNuevaDirec(){
      this.crearDirec = true;
    }

    addEvent( evento ) {

      if (evento.value) {
        //this.fechaFormatoPicker = evento.value._i.date+"-"+(evento.value._i.month+1)+"-"+evento.value._i.year;
        let fecha = evento.value._i.date+"/"+(evento.value._i.month+1)+"/"+evento.value._i.year;
        this.fechaFormatoDate = new Date(evento.value._i.year, evento.value._i.month+1, evento.value._i.date);
        console.log("this.fechaFormatoDate |", this.fechaFormatoDate);

        //this.fechaFormatoDate = fecha;
        //this.picker = fechaFormatoPicker; 
        this.picker = fecha; 

        console.log("fechaFormatoDate", this.fechaFormatoDate);
        //console.log(fecha, "|",this.picker);   
      }
      this.controlarExistenDatos();
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

}
