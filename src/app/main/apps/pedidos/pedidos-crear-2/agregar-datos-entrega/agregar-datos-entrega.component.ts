import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnyMxRecord } from 'dns';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosListaService } from '../../pedidos-lista/pedidos-lista.service';

export interface Articulo {
  id: number,
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
    selectedProvincia: any = 1;

    filtroLocalidades: any;
    selectedLocalidad: any = 1402;
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

    id: number = null;
    estanTodosLosDatos: boolean = false;

    ngOnInit(): void {
      this.getfiltros();
      switch (this.data.option) {
        case "add":
          this.deshabilitado = false;
          break;
        case "upd":
          this.deshabilitado = false;
          this.getDatoEntrega();
          break;
        case "view":
          this.deshabilitado = true;
          this.getDatoEntrega();
          break;
      }
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

      // console.log(this.datoEntrega);
      localStorage.setItem('datoEntrega', JSON.stringify(this.datoEntrega));
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

    getDatoEntrega(){

      this.contacto             = this.data.item.contacto;
      this.direccion            = this.data.item.direccion;
      this.picker               = new Date(this.data.item.fechaDeEntrega);
      this.valorPicker          = new Date(this.data.item.fechaDeEntrega);
      this.data.articulos       = this.data.item.listaPedidoDetalle;
      this.mail                 = this.data.item.mail;
      this.id                   = this.data.item.id;
      this.observaciones        = this.data.item.observaciones;
      this.selectedTurno        = this.data.item.pedidoTurno.id;
      this.selectedLocalidad    = this.data.item.sysLocalidad.id;
      this.selectedProvincia    = this.data.item.sysLocalidad.sysProvincia.id;
      this.selectedTransporte   = this.data.item.sysTransporte.id;
      this.telefono             = this.data.item.telefono;

      console.log(this.picker);
      console.log(this.data.item.fechaDeEntrega);
  
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


      this._pedidosListaService.getAllProvincias().subscribe(params => {
        this.filtroProvincias = params.datos;
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
    };


    selectProvincia(event: Event) {
      this.selectedProvincia = (event.target as HTMLSelectElement).value;
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
      this.selectedLocalidad = (event.target as HTMLSelectElement).value;
      // this.selectedCodigoPostal = (event.target as HTMLSelectElement);
      console.log((event.target as HTMLSelectElement).value);

      let localidadID: string = (event.target as HTMLSelectElement).value;
      


      console.log("POSTAL:", this.getPostalxLocalidad( parseInt(localidadID) ) );

      if(this.selectedLocalidad > 0){
        this._pedidosListaService.getProvinciaPorLocalidad(this.selectedLocalidad).subscribe( params => {
          this.selectedProvincia = params.id;
          console.log("Provincia: "+this.selectedProvincia);



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
      console.log(this.selectedTurno);
      this.controlarExistenDatos();
    }
    
    selectTransporte(event: Event) {
      this.selectedTransporte = (event.target as HTMLSelectElement).value;
      console.log(this.selectedTransporte);
      this.controlarExistenDatos();
    }

    addEvent( evento ) {
  
      if (evento.value) {
        let fecha = evento.value._i.year+"-"+(evento.value._i.month+1)+"-"+evento.value._i.date;
        console.log(fecha);

        this.picker = fecha;   
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
