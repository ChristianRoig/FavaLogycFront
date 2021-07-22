import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// componentes
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//servicios
import { ConfirmarAgregarLoteService } from './confirmar-agregarLote.service';


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

@Component({
  selector: 'app-confirmar-agregarLote',
  templateUrl: './confirmar-agregarLote.component.html',
  styleUrls: ['./confirmar-agregarLote.component.scss']
})

export class ConfirmarAgregarLoteComponent implements OnInit {
  
  @ViewChild('buscarNombreLote') buscarNombreLote: ElementRef;
  dataSourceArticulos: any;
  toAdd = new Array<number>();
  nombreLote: string;
  cantidadArticulos: number = 0;
  fechaAlta: string = "";
  picker: Date;
  nombreBoton: string;
  idLote: number;
  mostrarSpinner: boolean = false;
  contador: number = 0;
  //idCabecera: number;

  constructor(  public matDialogRef: MatDialogRef<ConfirmarAgregarLoteComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _serviceAgregarLoteConfirmar: ConfirmarAgregarLoteService,
                private _dialog: MatDialog,
                private _router: Router ) {          }

  ngOnInit(): void {
    if (this.data.vengoDeVerLote == true){
      console.log("lote actual: ",this.data.loteActual);
      this.nombreLote = this.data.loteActual.nombre;
      this.cantidadArticulos = this.data.loteActual.cantART;
      this.fechaAlta = this.getSoloFecha(this.data.loteActual.fechaAlta);
      this.nombreBoton = "Actualizar";
      this.idLote = this.data.loteActual.idLote;
    }
    if (this.data.vengoDeCrearLote == true){
      this.dataSourceArticulos = this.data.selection._selected;
      console.log("articulos p/crear lote: ",this.dataSourceArticulos);
      this.cantidadArticulos = this.dataSourceArticulos.length;
      this.picker =  new Date();
      this.nombreBoton = "Crear";
      this.idLote = this.dataSourceArticulos[0].id;
    }
  }

  searchNombreLote() {
    let inputNombreLoteValue = this.buscarNombreLote.nativeElement.value;
    if(inputNombreLoteValue != '' || inputNombreLoteValue != null )
      this.nombreLote = this.buscarNombreLote.nativeElement.value;
  }

  crearLote(){
    this.contador++; // incremento contador cada vez que entro a la funcion, para referenciar los clicks del usuario
    console.log("contador", this.contador);
    this.mostrarSpinner = true;
    if(this.data.vengoDeVerLote == true){
      this.actualizarLote();
    }
    if (this.data.vengoDeCrearLote == true && this.contador == 1 ){
      for (let elemento of this.dataSourceArticulos){
        this.toAdd.push(elemento.id);
      }
      console.log("this.toAdd");
      console.log(this.toAdd);
      if (this.toAdd.length > 0 ){ 
         this._serviceAgregarLoteConfirmar.postLote(this.toAdd, this.nombreLote).subscribe(
          data => {
            
            /* antes venia el id
            let idLote = data.idLote
            //this.imprimirCupas(idLote);
            localStorage.setItem( 'idLote', JSON.stringify( idLote )); */

            this._dialog.closeAll();

            // ahora viene la URL en data
            console.log(data);
            this.imprimirCupas(data);

            this.esperarYnavegarAlotes();
            
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
                let titulo = 'Error al Agregar';
                let mensaje = err.error.message.toString();
                this.mostrarError(errStatus, titulo, mensaje);
                this.matDialogRef.close();
                
              }
            }
          }
        ) 
      }
    }
  }

  imprimirCupas(data){

    // ahora viene la URL
    console.log("data", data );
    window.open( data.toString(), '_blank');

    /* antes venia el id
    // this._verLoteService.getImprimirCUPA( this.idLote ).subscribe( data => {

      console.log("data", data );
      window.open( data.toString(), '_blank');
      
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
    }); */
    
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  esperarYnavegarAlotes(){
    setTimeout(() => {                          
      let ruta = `lotes/lista-lotes`;
      this._router.navigate([ruta]);
    }, 1000);
  }

  actualizarLote(){
    if (this.contador == 1 ){
      this._serviceAgregarLoteConfirmar.updateNombreLote(this.nombreLote, this.idLote) .subscribe (data =>  {
        console.log("actualizacion exitosa", data);
        this._dialog.closeAll();
        this.esperarYnavegarAlotes();
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
            let titulo = 'Error al actualizar el nombre';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      });
    } 
    
  }

  mostrarError(errStatus, titulo, mensaje){
    const matDialogRefDos = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
    matDialogRefDos.afterClosed()
      .subscribe( () => {
        if (errStatus != 0) {  
          
        } else {
          this._router.navigate(['']);
        }
    });
  }

  navegarAlistaLotes(){
    let ruta = `lotes/lista-lotes`;
    this._router.navigate([ruta]);
  }

}
