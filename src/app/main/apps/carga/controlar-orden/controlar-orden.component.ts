import {Component, ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Debounce } from 'app/shared/decorators/debounce';
import { ErroresService } from 'app/services/errores.service';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

//service
import { ControlarOrdenService } from './controlar-orden.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'app-controlar-orden',
    templateUrl  : './controlar-orden.component.html',
    styleUrls    : ['./controlar-orden.component.scss'],
    animations   : [
      trigger('esconder', [
        state('show', style({
          height: '90px',
          opacity: 1
        })),
        state('hide',   style({
          height: '0px',
          opacity: 0
        })),
        transition('show => hide', animate('300ms ease-out')),
        transition('hide => show', animate('300ms ease-in'))
      ])
    ],
    encapsulation: ViewEncapsulation.None
})

export class ControlarCargaComponent implements OnInit {

  @ViewChild('controlarCupa') buscarCupaInput: ElementRef;
  //'idArticulo','nombreArticulo','codigoArticulo','codigoUnicoParteArticulo','etapa','nroParte','nroCbte','checkTransporte'
  displayedColumns: string[] = ['idArticulo','nombreArticulo','codigoArticulo','codigoUnicoParteArticulo','etapa','nroParte','nroCbte','checkTransporte'];
  dataSource2: any;

  idOrdenDist: number = null;
  cupa : number = null;

  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'nroCbte';
  order: string = 'asc';

    constructor(
      private _controlarOrdenService: ControlarOrdenService,
      private _dialog: MatDialog,
      private _router: Router,
      private _activatedRoute: ActivatedRoute
    ) { }

    

  ngOnInit(): void{
    this._activatedRoute.params.subscribe( params => {
    this.idOrdenDist = params['id'];
    });
    this.getArticulosDeOrdenDistribucion(this.idOrdenDist);
  }

  getArticulosDeOrdenDistribucion( idOrdenDist: number ) {
    this._controlarOrdenService.getArticulosDeOrdenDistribucion( idOrdenDist ) .subscribe( data => {
      console.log(data);
      //console.log(data.remitos[0].pedidoDetalles[0].articulo);
      //this.remitosDeOrden = data.remitos;
      this.dataSource2 = data.datos;
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
          let titulo = 'Error al listar remitos de orden ' + this.idOrdenDist;
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  controlarArticuloPorCupa(){
    this._controlarOrdenService.controlarArticuloPorCupa( this.idOrdenDist, this.cupa ) .subscribe( data => {
      //console.log(data);
      console.log("controlado");
      //console.log(data.remitos[0].pedidoDetalles[0].articulo);
      //this.remitosDeOrden = data.remitos;
      //this.dataSource2 = data;
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
          let titulo = 'Error al listar remitos de orden ' + this.idOrdenDist;
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
    this.esperarYactualizarDatos();
  }

  esperarYactualizarDatos(){
    setTimeout(() => {                          
      this.getArticulosDeOrdenDistribucion( this.idOrdenDist );
    }, 3000);
  }


  @Debounce(1000)  
  searchCupa() {
    this.cupa = this.buscarCupaInput.nativeElement.value;
    console.log(this.cupa);
    if( this.cupa < 1 ){
      this.cupa = null;
      
    }
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
            this.getArticulosDeOrdenDistribucion( this.idOrdenDist );
          } else {
            this._router.navigate(['']);
          }
      });
  }

  /* sortData( event ) {
      
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
  } */
    
}