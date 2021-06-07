import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subscription } from 'rxjs';
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

// import { Debounce } from 'app/shared/decorators/debounce';
// import { SonidoService } from 'app/shared/services/sonidos.service';
// import { ErroresService } from 'app/services/errores.service';

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
  estadoLote: string = '';
  codigoBarras: string = null;
  CUPA: string = null;

  btnControlar: boolean = false;
  btnBuscarLote: boolean = false;
  busquedaAutomatica: boolean = true;

  datos: any = [];
  lotesAux: any = [];
  dataSource2: any;

  length: number = 0;
  page: number = 0;
  size: number = 50;

  arregloDeDetalles;

  modo: string = '';
  condiciónDeEstadoLote: string = '';
  subParametros: Subscription;
  titulo: string;
  seccionOpuesta: string;
  eliminar: boolean = false;

  constructor(  private _router: Router, 
                private _fuseSidebarService: FuseSidebarService, 
                private _controlBusquedaService: ControlBusquedaService,
                private route: ActivatedRoute,
                private _dialog: MatDialog  ) { 

    this.route.params.subscribe(params => {
      this.modo = params['modo'];
      
      switch (this.modo) {
        case "estanteria":
          this.titulo = "Estantería";
          this.condiciónDeEstadoLote = 'NUEVO'; 
          this.getLotesPorEstado( this.page, this.size );
          break;
          case "darsena":
            this.titulo = "Dársena";
            this.condiciónDeEstadoLote = 'ESTANTERIA';
            this.getLotesPorEstado( this.page, this.size );
          break;
      }
    });

  }

  ngOnInit(): void {   }

  accederAcontrolarLoteById() {
    this.idLote = this.buscarLoteInput.nativeElement.value;
    this.navegarAlote();
  }

  navegarAlote(){
    let ruta = `lotes/lote-en/${ this.modo }/${ this.idLote }`;
    this._router.navigate([ruta]);
  }

  buscarLotePorNombre(nombre: string) {
    let bodyFechas = {
      desdeLote   : null,
      hastaLote   : null
    } 
    this.lote = nombre;
    this._controlBusquedaService.getLotePorNombre(this.lote, bodyFechas)
      .subscribe(data => {
        this.lotesAux = data.datos;
        console.log( this.lotesAux );
        this.dataSource2 = this.verificarEtapas();
        console.log( this.dataSource2 );
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

  verificarEtapas(){
    let lotesQueCumplen = [];
    for( let i=0; i<this.lotesAux.length; i++ ){
      if( this.lotesAux[i].estado === this.condiciónDeEstadoLote ) {
        lotesQueCumplen.push(this.lotesAux[i]);
      }
    }
    return lotesQueCumplen;
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

  controlar( lote ){
    console.log(lote);
    this.idLote = lote.idLote;
    this.navegarAlote();
    /* console.log(lote.estado, this.condiciónDeEstadoLote);
    if ( lote.estado === this.condiciónDeEstadoLote ){
      this.estadoLote = lote.estado;
      this.idLote = lote.idLote;
    } 
    else {
      let errStatus = 0;
      let titulo = 'El lote '+ lote.nombre +' no se encuentra en la etapa '+this.modo;
      let mensaje = "Realice el control en Control "+this.modo;
      this.mostrarError(errStatus, titulo, mensaje);
      let ruta = `apps/control/lote-en/${this.modo}`;
      this._router.navigate([ruta]);
    } */
  }

  buscarLotePorCUPA( cupa ){
    this.CUPA = cupa.value;
    this._controlBusquedaService.getDetalleLotePorCupa( cupa, this.modo ) .subscribe( data => {
        console.log(data);
        
        console.log(data.datos[0].detalle.pedidoLote.id);
        console.log(data.datos[0].detalle.pedidoLote.nombre); 
        console.log(data.datos[0].detalle.pedidoEtapa.nombre);
       
        this.idLote = data.datos[0].detalle.pedidoLote.id;
        this.lote = data.datos[0].detalle.pedidoLote.nombre;
        this.estadoLote = data.datos[0].detalle.pedidoLote.estado.nombre;
        
        console.log(this.estadoLote, "|", this.condiciónDeEstadoLote );
        if( this.estadoLote != this.condiciónDeEstadoLote ){
          let errStatus = 0;
          let titulo = 'El lote '+this.lote+' no se encuentra en la etapa '+this.condiciónDeEstadoLote;
          let mensaje = "Realice el control en control "+this.seccionOpuesta;
          this.mostrarError(errStatus, titulo, mensaje);
          let ruta = `lotes/lote-en/${this.modo}`;
          this._router.navigate([ruta]);
        }
        else{
          if(this.busquedaAutomatica){  // si la busquedaAtomatica es true accede de una al lote
            console.log("entré al busqueda automatica");
            this.navegarAlote();
          }
          else {
            this.btnControlar = true;
            this.btnBuscarLote = false;
            this.buscarLoteInput.nativeElement.value = this.idLote;
            this.buscarLotePorId( this.idLote );
          }
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } 
        else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          }
          else {
            let titulo = 'Error';
            let mensaje = "El lote no esta en la etapa "+ this.condiciónDeEstadoLote;
            this.mostrarError(errStatus, titulo, mensaje);
            let ruta = `control/lote-en/${this.modo}`;
            this._router.navigate([ruta]);
          }
        }
      });
  }

  getLotesPorEstado( page, size ){
    console.log(this.condiciónDeEstadoLote);
    this._controlBusquedaService.getLotesPorEstado( this.condiciónDeEstadoLote, page, size ) .subscribe( data => {
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

  buscarLotePorId(id: number){
    this._controlBusquedaService.getLotePorId( id ) .subscribe( data => {
      this.datos.push(data);
      console.log(this.datos);
      this.dataSource2 = this.datos; 
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

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  //@Debounce(1000) 
  searchCodigoBarras() {
    this.codigoBarras = this.buscarCodigoBarrasInput.nativeElement.value;
    this.buscarCUPAInput.nativeElement.focus();
  }

  //@Debounce(1000) 
  searchCUPA() {
    this.CUPA = this.buscarCUPAInput.nativeElement.value;
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
  toggleSidebarOpen(key): void {
      this._fuseSidebarService.getSidebar(key).toggleOpen();
  }  

  /* async buscarDetalleUnico() {

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
  }  */
  

  get funcionEsconder() {
    return this.eliminar ? 'show' : 'hide'
  }

  toggle() {
    this.eliminar = !this.eliminar;
  }

/*   @Debounce(1000)
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
  } */

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
    this.getLotesPorEstado( this.page, this.size ); 
  }
}
