import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnyMxRecord } from 'dns';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosListaService } from '../../pedidos-lista/pedidos-lista.service';
import { Console } from 'console';

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
    provincia;

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
    mostrarDatos: boolean = false;
    //fechaFormatoDate: Date;
    fechaFormatoDate: Date;
    id: number = null;
    estanTodosLosDatos: boolean = false;
    localidadID: string = "7600";
    //ciudadDefault = { nombreCiudad: "MAR DEL PLATA",  localidadID: this.localidadID, selectedLocalidad: this.selectLocalidad};
    //valorDefault: boolean = true;
    /* ciudadDefault  = {
      nombreCiudad: "MAR DEL PLATA",
      localidadID: 1402
    } */

    ngOnInit(): void {

      switch (this.data.option) {
        case "add":
          //console.log("this.selectedLocalidad en AGREGAR;", this.selectedLocalidad);
          this.selectedLocalidad = 1402; // 1402(Mar del plata) 
          this.deshabilitado = false;
          break;
        case "upd":
          this.deshabilitado = false;
          //this.mostrarDatos = true;
          this.getDatoEntrega();
          break;
          case "view":
            this.deshabilitado = true;
            //this.mostrarDatos = true;
            this.getDatoEntrega();
          break;
      }
      this.getfiltros();
    } 


    onNoClick(): void {
      // this.dialogRef.close();
    }

    agregar(){
      //console.log("this.selectedLocalidad en AGREGAR;", this.selectedLocalidad);
      //console.log("this.selectedProvincia en AGREGAR;", this.selectedProvincia);
      //console.log("| ID |", this.id);
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

      console.log("THIS DATOS ENTREGAAAAAAAA", this.datoEntrega);
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
      console.log("valor", valor);
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
      console.log("todo junto quedaria", dia,"|", mes, "|", anio)
      
      /* let date = new  Date ("2014-10-10");
      console.log(date.toDateString(), "estoy acá"); */
      return stringFechaAdaptada;
    }

    getDatoEntrega() {
      console.log("| DATA | ->", this.data);
      console.log("| selectedLocalidad | ->", this.data.item.sysLocalidad.id);
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
      this.selectedTransporte   = this.data.item.sysTransporte.id;
      this.telefono             = this.data.item.telefono;

      this.mostrarDatos = true; // tengo los datos ahora muestro


      console.log("LO QUE BUSCO", this.picker, "|",this.valorPicker, "|",this.data.item.fechaDeEntrega);
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

    setLocalidadSeleccionada(){
      if(this.mostrarDatos == true){
        //this.selectedLocalidad =
        this.nombreSelectedLocalidad = this.filtroLocalidades[this.data.item.sysLocalidad.id - 1].nombre;
        this.selectedLocalidad = this.filtroLocalidades[this.data.item.sysLocalidad.id - 1].id;
        console.log("this.nombreSelectedLocalidad", this.nombreSelectedLocalidad);
        console.log("this.selectedLocalidad", this.selectedLocalidad);
      }
    }

    getfiltros(){

      this._pedidosListaService.getAllTurnos().subscribe(params => {
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


      this._pedidosListaService.getAllTransportes().subscribe(params => {
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


      /* this._pedidosListaService.getAllProvincias().subscribe(params => {
        this.filtroProvincias = params.datos;
        console.log("filtroProvincias -> ", params.datos);
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
      }) */
  
      this._pedidosListaService.getAllLocalidades().subscribe(params => {
        this.filtroLocalidades = params.datos;

        this.setLocalidadSeleccionada();
        //console.log("el primero ", this.filtroLocalidades[0]);
        //console.log("el selectedLocalidad ", this.selectedLocalidad);
        
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
      
      this._pedidosListaService.getProvinciaPorLocalidad( this.selectedLocalidad ).subscribe( params => {
        this.provincia = params;
        this.selectedProvincia = params.id;
        //console.log("filtroProvincias -> ", this.selectedProvincia);
         //console.log("filtroProvincias asdasd-> ", this.selectedProvincia);
        //this.filtroProvincias = params;
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
        this.selectedLocalidad = 0;
        this._pedidosListaService.getAllLocalidadesPorProvincia(this.selectedProvincia).subscribe(params => {
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
      } else {
        this.selectedLocalidad = 0;
        this._pedidosListaService.getAllLocalidades().subscribe(params => {
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
      //console.log("ENTRE A SELECTLOCALIDAD");
      this.selectedLocalidad = (event.target as HTMLSelectElement).value;
      // this.selectedCodigoPostal = (event.target as HTMLSelectElement);
      console.log( this.selectedLocalidad );

      this.localidadID = (event.target as HTMLSelectElement).value;
      
      //console.log("POSTAL:", this.getPostalxLocalidad( parseInt(this.localidadID) ) );

      if(this.selectedLocalidad > 0){
        this._pedidosListaService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
          console.log("localidades -> ",params);
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
