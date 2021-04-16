import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

// componentes
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
/* import { ModalDeseaImprimirLoteComponent } from '../modal-desea-imprimir/modal-desea-imprimir.component'; */
import { VerImpresorasComponent } from '../../../lotes/lista-lotes/ver-impresoras/ver-impresoras.component';

//servicios
import { ConfirmarAgregarLoteService } from './confirmar-agregarLote.service';
import { ListaLotesService } from '../../lista-lotes/lista-lotes.service';
import { ModalDeseaImprimirLoteComponent } from '../modal-desea-imprimir/modal-desea-imprimir.component';

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
  cantidadArticulos: number;
  picker: Date;
  //idCabecera: number;

  constructor(  public matDialogRef: MatDialogRef<ConfirmarAgregarLoteComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _serviceAgregarLoteConfirmar: ConfirmarAgregarLoteService,
                private _dialog: MatDialog,
                private _router: Router,
                private route: ActivatedRoute,
                private _listaLoteService: ListaLotesService ) {          }

  ngOnInit(): void {
    /* this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    }) */
    //this.dataSourceArticulos = JSON.parse(localStorage.getItem('Lote'))._selected;
    //localStorage.clear();
    this.dataSourceArticulos = this.data.selection._selected;
    console.log(this.dataSourceArticulos);

    this.cantidadArticulos = this.dataSourceArticulos.length;

    this.picker =  new Date();
  }

  searchNombreLote() {
    this.nombreLote = this.buscarNombreLote.nativeElement.value;
  }

  crearLote(){
    for (let elemento of this.dataSourceArticulos){
      this.toAdd.push(elemento.id);
    }
    console.log("this.toAdd");
    console.log(this.toAdd);
    if (this.toAdd.length > 0){
      this._serviceAgregarLoteConfirmar.postLote(this.toAdd, this.nombreLote).subscribe(
        data => {
          let idLote = data.idLote
          //this.imprimirCupas(idLote);
          localStorage.setItem( 'idLote', JSON.stringify( idLote ));
          this.matDialogRef.close();
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
              let titulo = 'Error al Agregar';
              let mensaje = err.error.message.toString();
              this.mostrarError(errStatus, titulo, mensaje);
            }
          }
        }
      )
    }
  }
  
  mostrarError(errStatus, titulo, mensaje){
    const matDialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
    matDialogRef.afterClosed()
      .subscribe( () => {
        if (errStatus != 0) {  
          
        } else {
          this._router.navigate(['']);
        }
    });
  }

  /* esperarYnavegarAlotes(){
    setTimeout(() => {                          
      this._dialog.closeAll();
      this.navegarAlistaLotes( );
    }, 1000);
  } */

  navegarAlistaLotes(){
    let ruta = `apps/lotes/lista-lotes`;
    this._router.navigate([ruta]);
  }

  volver(){
    /* let ruta = `apps/lotes/crear-lote`;
    this._router.navigate([ruta]); */
  }


  /* imprimirCupas(idLote: number){
    const dialogRef = this._dialog.open( ModalDeseaImprimirLoteComponent, {
      data: {
        idLote: idLote
      }
    });

    dialogRef.beforeClosed()
      .subscribe(result => {
        if ( result ){
          this.imprimirCupa(idLote);
        }
        
      });
  }

  imprimirCupa(idLote){

    let application_name = "Favalogyc";
    let permission_name = "Impresion_CUPA"

    if(localStorage.getItem('ImpresoraCUPA')){
      this.imprimir(idLote);
    } else {
      this.seleccionarImpresora(idLote);     //ARREGLAR ESTO
    } 
    // }
  }

  imprimir(idLote){
    let impresora = localStorage.getItem('ImpresoraCUPA');
    console.log(idLote);
    alert("idLote");
    this._listaLoteService.imprimir( idLote, impresora ).subscribe(data => {
      
      let titulo = 'Estado de impresión';
      let mensaje = "Completado correctamente";
      this.mostrarError(-1, titulo, mensaje);
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
          let titulo = 'Error al imprimir';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  } 
  
  seleccionarImpresora(idLote){
    let dialogRef = this._dialog.open(VerImpresorasComponent, {
      data: {
        //pedidos: this.selection,
        pedidos: this.dataSourceArticulos,
        impresora: 'ImpresoraCUPA'
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if(localStorage.getItem('ImpresoraCUPA')){
          this.imprimir(idLote);
        } else {
          dialogRef.close();
          this.seleccionarImpresora(idLote);
        }
      });
  } */


}
