import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { PopUpOrdenControladaService } from './popUpOrdenControlada.service';


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

  constructor(  public matDialogRef: MatDialogRef<PopUpOrdenControladaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _dialog: MatDialog,
                private _router: Router,
                private _popUpOrdenControladaService: PopUpOrdenControladaService ) {          }

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

  descargarCOT(){
    this._popUpOrdenControladaService.descargarCOT( this.idOrdenDist ).subscribe( data => {
      console.log( data );
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