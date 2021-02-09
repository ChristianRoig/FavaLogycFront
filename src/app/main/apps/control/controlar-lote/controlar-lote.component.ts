import {Component, ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Debounce } from 'app/shared/decorators/debounce';
import { SonidoService } from 'app/services/sonidos.service';
import { ErroresService } from 'app/services/errores.service';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

import { ControlBusquedaService } from '../control-busqueda/control-busqueda.service';

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
    arregloDeDetalles = [];
    modo: string = '';
    idLote : number;
    nombreLote: string = '';
    eliminar: boolean = false;
    codigoBarras: string = null;
    CUPA: string = null;

    condicion: string = null;
    endPoint: string = null;

    constructor(
      private _router: Router,
      private _controlBusquedaService: ControlBusquedaService,
      private _sonido: SonidoService,
      private _erroresServices: ErroresService,
      private _dialog: MatDialog
    ) {}

    

    ngOnInit(): void{
      this.arregloDeDetalles = this._controlBusquedaService.arregloDeDetalles;
      this.idLote = this._controlBusquedaService.idLote;
      this.modo = this._controlBusquedaService.modo;

      console.log("this.arregloDeDetalles", this.arregloDeDetalles);
      console.log("modo", this.modo);
      
      if(!this.arregloDeDetalles || this.arregloDeDetalles.length == 0) {
        this.alertArregloVacio();
      } else {
        this.setearCondicion();
        this.verificarEtapas();
      }
    }

    alertArregloVacio(){
        let titulo = 'Error de MEJORAR NOMBRE';
        let mensaje = "El lote con id "+ this.idLote +" no existe o está vacío";
        let errStatus = 404;
        this.mostrarError(errStatus, titulo, mensaje);
        this._router.navigate([`/apps/control/lote-en/${this.modo}`]);
    }
    
    setearCondicion(){
      if(this.modo === 'estanteria'){
        this.condicion = 'EN LOTE';
        this.endPoint = 'estanteria';
      } else {
        this.condicion = 'ESTANTERIA';
        this.endPoint = 'darsena';
      }
    }

    verificarEtapas(){
      for( let i=0; i<this.arregloDeDetalles.length; i++ ){
        if( this.arregloDeDetalles[i].detalle.pedidoEtapa.nombre != this.condicion ) {
          let titulo = 'Ubicacion de lote incorrecta';
          let mensaje = "El CUPA de "+this.arregloDeDetalles[i].detalle.articulo.nombre+" está en estado " 
            + this.arregloDeDetalles[i].detalle.pedidoEtapa.nombre + " y no se puede utilizar para control de "+this.endPoint;
          let errStatus = 404;
          this._router.navigate([`apps/control/lote-en/${this.endPoint}`]);
          this.mostrarError(errStatus, titulo, mensaje);
          return;
        } 
      } 
    } 

    async buscarDetalleUnico() {
      console.log("buscarDetalleUnico");
      this.arregloDeDetalles = null;
      let res = await this._controlBusquedaService.getDetalleUnico(this.idLote, '', this.modo);
      this.arregloDeDetalles = res.datos;
      console.log(this.arregloDeDetalles);
    }

  @Debounce(1000) 
  async agregarEstanteria() {
    
    console.log(this.CUPA);
    console.log(this.codigoBarras);

    let res = await this._controlBusquedaService.getCupaCodBarras(this.CUPA, this.idLote, this.codigoBarras, this.modo);
    console.log(res);
    if (!res) {
      this._sonido.playAudioSuccess();
      this.resetCampos();
      this.buscarDetalleUnico();
    } else {
      this._erroresServices.error(res);
      
      this.resetCampos();
      await this.buscarDetalleUnico();
    }
  }

  @Debounce(1000) 
  searchCodigoBarras() {

    this.codigoBarras = this.buscarCodigoBarrasInput.nativeElement.value;
    this.buscarCUPAInput.nativeElement.focus();
  }

  @Debounce(1000) 
  searchCUPA() {

    this.CUPA = this.buscarCUPAInput.nativeElement.value;
    this.agregarEstanteria();
  }

    resetCampos(){
      this.buscarCodigoBarrasInput.nativeElement.value = '';
      this.buscarCUPAInput.nativeElement.value = '';
      this.codigoBarras = '';
      this.CUPA = '';
      this.eliminar = false;
      this.buscarCodigoBarrasInput.nativeElement.focus();
    }

    toggle() {
      this.eliminar = !this.eliminar;
    }

    get funcionEsconder() {
      return this.eliminar ? 'show' : 'hide'
    }

  @Debounce(1000)
  async eliminarCupa() {
    
    let res = await this._controlBusquedaService.eliminarArticuloDeLotePorCupa(this.eliminaCupaInput.nativeElement.value);
    if(!res) {
      this._sonido.playAudioSuccess();
      this.resetCampos();
      await this.buscarDetalleUnico();
    } else {
      this._erroresServices.error(res);
      
      this.resetCampos();
      await this.buscarDetalleUnico();
    }
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