import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { SonidoService } from 'app/services/sonidos.service';
import { Subscription } from 'rxjs';
import { ErroresService } from 'app/services/errores.service';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

//services
import { ControlBusquedaService } from './control-busqueda.service';

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
  @ViewChild('cupa') buscarLotePorCUPAInput: ElementRef;
  @ViewChild('buscarCodigoBarras') buscarCodigoBarrasInput: ElementRef;
  @ViewChild('eliminaCupa') eliminaCupaInput: ElementRef;

  displayedColumns: string[] = ['id', 'nombre', 'fechaAlta', 'cantArticulos', 'estado', 'seleccionar'];
  idLote: number = null;
  lote: string = null;
  codigoBarras: string = null;
  CUPA: string = null;

  btnControlar: boolean = false;
  btnBuscarLote: boolean = false;
  busquedaAutomatica: boolean = false;

  dataSource2: any;
  length: number = 0;
  page: number = 0;
  size: number = 10;

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
              private _erroresServices: ErroresService,
              private _dialog: MatDialog,) { 

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
    this.getLotesAbiertos(this.page, this.size);
  }

  accederAlLoteById() {
    this.idLote = this.buscarLoteInput.nativeElement.value;
    console.log(this.idLote);
    console.log("asd",this.modo);
    this.buscarDetalleUnico();
  }

  buscarLotePorNombre(nombre: string) {
    let bodyFechas = {
      desdeLote   : null,
      hastaLote   : null
    } 
   this.lote = nombre;
    this._controlBusquedaService.getLotePorNombre(this.lote, bodyFechas)
      .subscribe(data => {
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
            let titulo = 'Error al listar';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
    }); 
  }

  toggleBusquedaAutomatica(){
    this.busquedaAutomatica = !this.busquedaAutomatica;
  }

  searchLote() {
    this.lote = this.buscarLoteInput.nativeElement.value;
    if (this.lote === '' || this.lote === null) {
      this.lote = null;
      this.btnControlar = false;
      this.btnBuscarLote = false;
    } else {
      this.btnBuscarLote = true;
    }
  }

  searchCupa() {
    this.CUPA = this.buscarLotePorCUPAInput.nativeElement.value;
    if(this.CUPA === '') {
      this.CUPA = null;
    }
  }

  controlar(lote){
    this.idLote = lote.id;
    this.buscarDetalleUnico()
  }

  buscarLotePorCUPA( cupa ){
    this.CUPA = cupa.value;
    this._controlBusquedaService.getDetalleLotePorCupa( cupa, this.modo ) .subscribe( data => {
      console.log(data);
      console.log(data.datos[0].detalle.pedidoLote.id);
      console.log(data.datos[0].detalle.pedidoLote.nombre);
      this.idLote = data.datos[0].detalle.pedidoLote.id;
       if(this.busquedaAutomatica){  // si la busquedaAtomatica es true accede de una al lote
          this.buscarDetalleUnico();
      } else {
          this.btnControlar = true;
          this.btnBuscarLote = false;
          this.buscarLoteInput.nativeElement.value = this.idLote;
          this.buscarLotePorNombre(data.datos[0].detalle.pedidoLote.nombre);
      }
      //sino el idLote se pone en el input, se habilita el btn Controlar al lote y aparece el lote en el listado(getLotePorNombre)
      

      /* this._controlBusquedaService.arregloDeDetalles = data.datos[0];
      this.idLote = data.datos[0].detalle.pedidoLote.id;
      this._controlBusquedaService.idLote = data.datos[0].detalle.pedidoLote.id;
      this._controlBusquedaService.modo = this.modo; */
      //let ruta = `apps/control/lote-en/${this.modo}/busqueda`;
      /* let ruta = `apps/control/lote-en/${this.modo}/${this.idLote}`;
      this._router.navigate([ruta]); */
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
          let titulo = 'Error al listar';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getLotesAbiertos( page, size ){
    let estado = "ABIERTO";
    this._controlBusquedaService.getLotesPorEstado( estado, page, size ) .subscribe( data => {
      console.log(data);
      this.dataSource2 = data.datos; 
      this.length = data.totalRegistros;
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
          let titulo = 'Error al listar';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
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

  mostrarError(errStatus, titulo, mensaje){
    const dialogRef = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
    this._router.navigate(['']);
    dialogRef.afterClosed()
     /*  .subscribe( () => {
          if (errStatus != 0) {

            // this.getDetalle(this.busqueda, this.page, this.size, this.columna, this.order);
            
          } else {
            this._router.navigate(['']);
          }
      }); */
  }

  paginar(e: any){
    console.log(e);
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    //this._listaLoteService.getAllLotes( this.page, this.size ); 
    this.getLotesAbiertos( this.page, this.size ); 
  }
}
