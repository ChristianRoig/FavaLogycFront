import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ComprobantesListaService } from './comprobantes-lista.service';
import { MatTabChangeEvent } from '@angular/material/tabs';


export interface Articulos {
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

export interface BodyDetalle{

  idTipo : number;
  idTurno : number;
  idOrigen : number;
  idEstado : number;
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  lote : string;
  desdeLote : string;
  hastaLote : string;
}

@Component({  
  selector: 'app-comprobantes-lista',  
  templateUrl: './comprobantes-lista.component.html',
  styleUrls: ['./comprobantes-lista.component.scss']
})


export class ComprobantesListaComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  mensaje: string;

  maxDateHastaLote: Date;

  index: number;

  /* navLinks = [  //pendiente para la proxima presentacion
    { path: 'comprobantes-a-programar', label: 'Comprobantes a programar' },
    { path: 'comprobantes', label: 'Comprobantes' },
    { path: 'pedidos', label: 'Pedidos' },
    { path: 'articulos', label: 'Articulos' },
  ]; */


  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _comprobantesListaService: ComprobantesListaService,
              private _dialog: MatDialog ) { }

  ngOnInit(): void { 
  
  }

  /* tabChanged = (tabChangeEvent: MatTabChangeEvent): void => { //captura el event del cambio de pestaña
    console.log('tabChangeEvent => ', tabChangeEvent); 
    console.log('index => ', tabChangeEvent.index);
    this.index =  tabChangeEvent.index;
  
  } */



}
