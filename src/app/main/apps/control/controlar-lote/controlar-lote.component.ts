import {Component, ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Debounce } from 'app/shared/decorators/debounce';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { ControlarLoteService } from './controlar-lote.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'controlar-lote',
    templateUrl  : './controlar-lote.component.html',
    styleUrls    : ['./controlar-lote.component.scss'],
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

export class ControlarLoteComponent implements OnInit {

  @ViewChild('buscarCUPA') buscarCUPAInput: ElementRef;
  @ViewChild('buscarCodigoBarras') buscarCodigoBarrasInput: ElementRef;
  @ViewChild('eliminaCupa') eliminaCupaInput: ElementRef;
    
  /* displayedColumns: string[] = ['check', 'nombreArt', 'codArt', 'etapa', 'cant','codBarra', 'cupa'];
  dataSource2: any; */
  articulos: [] = null;
  modo: string = '';
  idLote : number;
  nombreLote: string = '';
  eliminar: boolean = false;
  codigoBarras: string = null;
  cupa: string = null;

  condicion: string = null;
  endPoint: string = null;

  constructor(
    private _router: Router,
    private _controlarLoteService: ControlarLoteService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this._activatedRoute.params.subscribe( params => {
      //console.log( params );
      //console.log( params['modo'] );
      //console.log( params['id'] );
      this.modo = params['modo'];
      this.idLote = params['id'];
    });
    this.getArticulosDeLote();
  }

  alertArregloVacio(){
    let titulo = 'Algo salió mal';
    let mensaje = "El lote con id "+ this.idLote +" no existe o está vacío";
    let errStatus = 404;
    this.mostrarError(errStatus, titulo, mensaje);
    this.volver();
  }
  
  /* setearCondicion(){
    if(this.modo === 'estanteria'){
      this.condicion = 'EN LOTE';
      this.endPoint = 'estanteria';
    } else {
      this.condicion = 'ESTANTERIA';
      this.endPoint = 'darsena';
    }
  }  */

  /* verificarEtapas(){
    for( let i=0; i<this.arregloDeDetalles.length; i++ ){
      if( this.arregloDeDetalles[i].detalle.pedidoEtapa.nombre != this.condicion ) {
        let titulo = 'Ubicacion de lote incorrecta';
        let mensaje = "El cupa de "+this.arregloDeDetalles[i].detalle.articulo.nombre+" está en estado " 
          + this.arregloDeDetalles[i].detalle.pedidoEtapa.nombre + " y no se puede utilizar para control de "+this.endPoint;
        let errStatus = 404;
        this._router.navigate([`apps/control/lote-en/${this.endPoint}`]);
        this.mostrarError(errStatus, titulo, mensaje);
        return;
      } 
    } 
  } */

  volver(){
    let ruta = `/apps/control/lote-en/${this.modo}`;
    this._router.navigate([ruta]);
  }

  actualizar(){
    window.location.reload();
  }

  getArticulosDeLote() {
    this._controlarLoteService.getArticulosDeLote(this.idLote, '', this.modo).subscribe( data => {
      console.log( data );
      this.articulos = data.datos;
      //this.articulos = this.dataSource2;
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
          let titulo = 'Error';
          let mensaje = "El articulo no se agregó";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
   /*  if( !this.articulos || this.articulos.length == 0 ) {
      this.alertArregloVacio();
    } else {
      this.setearCondicion();
      //this.verificarEtapas();
    } */
  }

  esperarYactualizarDatos(){
    setTimeout(() => {                          
      this.getArticulosDeLote();
      //this.actualizar();
    }, 1000);
  }

  controlarEtapaArticulo() {
    // al chequear el articulo la etapa del articulo cambia
    console.log(this.cupa);
    console.log(this.codigoBarras);
    this.articulos = null;

    this._controlarLoteService.controlarEtapaArticulo( this.cupa, this.idLote, this.codigoBarras, this.modo )
      .subscribe( data => {
        console.log("control exitoso");

        this.esperarYactualizarDatos();
        
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
            let titulo = 'Error';
            let mensaje = "No se controló el artículo";
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      });
    }
    //this.esperarYactualizarDatos();


  @Debounce(1000) 
  searchCodigoBarras() {
    this.codigoBarras = this.buscarCodigoBarrasInput.nativeElement.value;
    //this.buscarCUPAInput.nativeElement.focus();
  }  

  @Debounce(1000) 
  searchCUPA() {
    this.cupa = this.buscarCUPAInput.nativeElement.value;

  }

  resetCampos(){
    this.buscarCodigoBarrasInput.nativeElement.value = '';
    this.buscarCUPAInput.nativeElement.value = '';
    this.codigoBarras = '';
    this.cupa = '';
    this.eliminar = false;
    this.buscarCodigoBarrasInput.nativeElement.focus();
  }

  toggle() {
    this.eliminar = !this.eliminar;
  }

  get funcionEsconder() {
    return this.eliminar ? 'show' : 'hide'
  }

  borrarArticuloDeLotePorCupa() {
    this._controlarLoteService.eliminarArticuloDeLotePorCupa( this.cupa ).subscribe( data => {
      //this.dataSource2 = data.datos;
      console.log("borrado ");
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
          let titulo = 'Error ';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  mostrarError(errStatus, titulo, mensaje){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });

    /* dialogRef.afterClosed()
      .subscribe( () => {
          if (errStatus != 0) {
            //this.resetFiltros();
            
          } else {
            this._router.navigate(['']);
          }
      });*/
  } 
}