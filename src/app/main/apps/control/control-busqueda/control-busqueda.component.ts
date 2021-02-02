import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ControlBusquedaService } from './control-busqueda.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { SonidoService } from 'app/services/sonidos.service';
import { Subscription } from 'rxjs';
import { ErroresService } from 'app/services/errores.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({  
  selector: 'app-control-busqueda',  
  templateUrl: './control-busqueda.component.html',
  styleUrls: ['./control-busqueda.component.scss'],
  animations: [
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
  ]
})

export class ControlEstanteriaComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;
  @ViewChild('buscarCUPA') buscarCUPAInput: ElementRef;
  @ViewChild('buscarCodigoBarras') buscarCodigoBarrasInput: ElementRef;
  @ViewChild('eliminaCupa') eliminaCupaInput: ElementRef;

  idLote: number = null;
  lote: string = null;
  codigoBarras: string = null;
  CUPA: string = null;

  arregloDeDetalles;

  modo: string = '';
  subParametros: Subscription;
  titulo: string;
  eliminar: boolean = false;

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _controlBusquedaService: ControlBusquedaService,
              private route: ActivatedRoute,
              private _sonido: SonidoService,
              private _erroresServices: ErroresService,) { 

    this.route.params.subscribe(params => {
      
      this.modo = params['modo'];
      //this.modo = params['modo'];

      // agregar refresh
      if(this.titulo) {
        if(this.titulo !== this.modo) {
          // location.reload();
          this.lote = '';
          this.buscarLoteInput.nativeElement.value = '';
          // this.buscarCbteInput.nativeElement.value = '';
        }
      }
      
      switch (this.modo) {
        case "estanteria":
          this.titulo = "Estantería";
          break;
        case "darsena":
          this.titulo = "Dársena";
          break;
      }

    });
    
  }

  ngOnInit(): void {
    
  }

  buscarLote() {
    
    this.idLote = this.buscarLoteInput.nativeElement.value;
    this.buscarDetalleUnico();

  }

  searchLote() {

    this.lote = this.buscarLoteInput.nativeElement.value;
    if(this.lote === '') {
      this.lote =null;
    }
    console.log("idLote ->", this.lote);
    

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

  // @Debounce(1000) 
  resetCampos(){
    this.buscarCodigoBarrasInput.nativeElement.value = '';
    this.buscarCUPAInput.nativeElement.value = '';
    this.codigoBarras = '';
    this.CUPA = '';
    this.eliminar = false;
    this.buscarCodigoBarrasInput.nativeElement.focus();
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void
  {
      this._fuseSidebarService.getSidebar(key).toggleOpen();
  }  

  async buscarDetalleUnico() {
    //console.log("asdasdasd");

    this.arregloDeDetalles = null;
    // let codArt = this.buscarCbteInput.nativeElement.value ? this.buscarCbteInput.nativeElement.value : '';
    let res = await this._controlBusquedaService.getDetalleUnico(this.idLote, '', this.modo);
    this.arregloDeDetalles = res.datos;
    console.log(this.arregloDeDetalles);
    this._controlBusquedaService.arregloDeDetalles = this.arregloDeDetalles;
    this._controlBusquedaService.idLote = this.idLote;
    this._controlBusquedaService.modo = this.modo;
    //let ruta = `apps/control/lote-en/${this.modo}/busqueda`;
    let ruta = `apps/control/lote-en/${this.modo}/${this.idLote}`;
    this._router.navigate([ruta]);
  }
  
  @Debounce(1000) 
  async agregarEstanteria() {
    
    console.log(this.CUPA);
    console.log(this.codigoBarras);
    

    let res = await this._controlBusquedaService.getCupaCodBarras(this.CUPA, this.idLote, this.codigoBarras, this.modo);
    console.log(res);
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

  get funcionEsconder() {
    return this.eliminar ? 'show' : 'hide'
  }

  toggle() {
    this.eliminar = !this.eliminar;
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

}
