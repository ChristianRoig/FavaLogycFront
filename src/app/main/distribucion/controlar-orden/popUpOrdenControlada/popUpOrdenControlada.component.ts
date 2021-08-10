import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { PopUpOrdenControladaService } from './popUpOrdenControlada.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popUpOrdenControlada',
  templateUrl: './popUpOrdenControlada.component.html',
  styleUrls: ['./popUpOrdenControlada.component.scss']
})

export class PopUpOrdenControladaComponent implements OnInit {
  
  modo: string;
  idLote: number;


  idOrdenDist: number;
  nombreOrden: string;

  /* responseUrl:string; */
  responseUrl: any;

  constructor(  public matDialogRef: MatDialogRef<PopUpOrdenControladaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _dialog: MatDialog,
                private _router: Router,
                private _popUpOrdenControladaService: PopUpOrdenControladaService,
                private sanitizer: DomSanitizer ) {          }

  ngOnInit(): void {

    console.log( this.data );
    this.idOrdenDist = this.data.orden.id;
    this.nombreOrden = this.data.orden.nombre;
  }

  navegarAlista(){
    this._dialog.closeAll();
    let ruta = `distribucion/control-de-carga`;
    this._router.navigate([ruta]);
  }

  /* descargarCOT(){
    this._popUpOrdenControladaService.descargarCOT( this.idOrdenDist ).subscribe( data => {
      console.log( data );
      this.responseUrl = data;
      //window.open( data );
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
          let titulo = 'Error al imprimir';
          let mensaje = "No pudo descargarse el archivo";
          console.log(errStatus);
          this.mostrarError( errStatus, titulo, mensaje );
        }
      }
    });
  } */

  /* descargarCOT(){      // version de benja que anda
    this._popUpOrdenControladaService.descargarCOT( this.idOrdenDist ).subscribe( data => {

        const url = window.URL
              .createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
          let titulo = 'Error al imprimir';
          let mensaje = "No pudo descargarse el archivo";
          console.log(errStatus);
          this.mostrarError( errStatus, titulo, mensaje );
        }
      }
    });
  } */


  descargarCOT() {          // version benja
    this._popUpOrdenControladaService.descargarCOT( this.idOrdenDist ).subscribe( data => {

        const url = window.URL
              .createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.txt');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
          let titulo = 'Error al imprimir';
          let mensaje = "No pudo descargarse el archivo";
          console.log(errStatus);
          this.mostrarError( errStatus, titulo, mensaje );
        }
      }
    });
  }

  mostrarError( errStatus, titulo, mensaje ){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
  }

}