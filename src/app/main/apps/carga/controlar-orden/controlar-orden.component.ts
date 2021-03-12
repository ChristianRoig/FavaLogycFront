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

  @ViewChild('buscarCupa') buscarCupaInput: ElementRef;
  //<!-- id, codComprobante, nroComprobante, fechaAlta,   , cantArticulos -->
  displayedColumns: string[] = ['id', 'codComprobante', 'nroComprobante', 'fechaAlta', 'cantArticulos'];
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
    this.getRemitosDeOrdenDistribucion(this.idOrdenDist);
  }

  getRemitosDeOrdenDistribucion (idOrdenDist: number) {
    this._controlarOrdenService.getRemitosDeOrdenDistribucion( idOrdenDist ) .subscribe( data => {
      //console.log(data.remitos);
      //this.remitosDeOrden = data.remitos;
      this.dataSource2 = data.remitos;
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


  @Debounce(50)  
  searchRemito() {
    this.cupa = this.buscarCupaInput.nativeElement.value;
    console.log(this.cupa);
    if( this.cupa < 1 ){
      this.cupa = null;
      
    }
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
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
            this.getRemitosDeOrdenDistribucion( this.idOrdenDist );
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