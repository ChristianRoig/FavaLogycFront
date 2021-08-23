import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { PedidosCodigosBarraComponent } from '../codigos-barra.component';

import{ ImprimirCodBarraService } from './imprimir-cod-barra.service';

@Component({
  selector: 'app-imprimir-cod-barra',
  templateUrl: './imprimir-cod-barra.component.html',
  styleUrls: ['./imprimir-cod-barra.component.scss']
})
export class ImprimirCodBarraComponent implements OnInit {

  @ViewChild('cantImpresiones') cantImpresiones: ElementRef;

  idArticulo: number;
  codigoArticulo: string;
  cant: number = 1;
  mostrarSpinner: boolean = false;
  
  codigoDeBarras: number;
  descripcion: string;
  nombre: string;

  constructor(  public matDialogRef: MatDialogRef<ImprimirCodBarraComponent>,
                private _imprimirCodBarraService: ImprimirCodBarraService,
                private _dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {

    console.log( "data", this.data );
    this.idArticulo = this.data.idArticulo;
    this.codigoArticulo = this.data.codigoArticulo;

    this.obtenerDatos();
  }

  imprimirCodigosDeBarra(){
    this.mostrarSpinner = true;
    
    this._imprimirCodBarraService.getImprimirCodBarra( this.idArticulo, this.cant ).subscribe( data => {

      this.mostrarSpinner = false;
      console.log("data", data );
      window.open( data.toString(), '_blank');
      this.matDialogRef.close();

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
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  obtenerDatos(){
    this._imprimirCodBarraService.getCodigoBarra( this.idArticulo ).subscribe( data => {
  
      console.log({data});
      console.log(data.codigoDeBarras);
      this.codigoDeBarras = data.codigoDeBarras;
      this.descripcion = data.descripcion;
      this.nombre = data.articulo.nombre;
      this.codigoArticulo = data.articulo.codigoArticulo;
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
                  let titulo = 'Código de Barras no encontrado';
                  let mensaje = err.error.message.toString();
                  this.mostrarError(errStatus, titulo, mensaje);
              }
          }
      }
    );
  }

  setearCantidad( ){

    let cantidad = this.cantImpresiones.nativeElement.value;
    if( cantidad > 0 ){
      this.cant = cantidad;
    }
  }

  mostrarError(errStatus, titulo, mensaje){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
  }

}
