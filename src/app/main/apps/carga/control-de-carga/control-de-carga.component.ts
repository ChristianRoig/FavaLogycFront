import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Debounce } from 'app/shared/decorators/debounce';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';

//services
import { ControlDeCargaService } from './control-de-carga.service';

@Component({  
  selector: 'app-control-de-carga',  
  templateUrl: './control-de-carga.component.html',
  styleUrls: ['./control-de-carga.component.scss'],
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

export class ControlDeCargaComponent implements OnInit {

  @ViewChild('buscar') buscarOrdenInput: ElementRef;
  // cantArticulos: cantArticulosACargar: cantRemitos: estado: fecha: id: nombre:  
  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'estado', 'cantArticulos', 'cantArticulosACargar', 'cantRemitos', 'localidad', 'transporte', 'seleccionar'];
  dataSource2: any;
  
  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'id';
  order: string = 'desc';
  
  idOrdenDist: number = null;
  titulo: string = '';
  btnBuscar: boolean = false;

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _controlDeCargaService: ControlDeCargaService,
              private _dialog: MatDialog,) {  }

  ngOnInit(): void {
    //console.log(this.condiciónDeEstadoLote);
    this.getAllOrdenes();
  }

  getAllOrdenes() {
    this._controlDeCargaService.getAllOrdenes( this.page, this.size, this.columna, this.order ).subscribe( data => {
        console.log("data", data);
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
            let titulo = 'Error al buscar una orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
    }); 
  }

  @Debounce(50)
  searchOrden() {
    this.idOrdenDist = this.buscarOrdenInput.nativeElement.value;
    if (this.idOrdenDist >= 1) {
      this.btnBuscar = true;
    } else{
      this.idOrdenDist = null;
      this.getAllOrdenes();
    } 
  }

  buscarOrdenPorId() {
    let resultado: any = [];
    this._controlDeCargaService.getOrdenById( this.idOrdenDist ).subscribe( data => {
        console.log(data);
        resultado.push(data);
        this.dataSource2 = resultado;
        this.length = resultado.length;
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
            let titulo = 'Error al buscar una orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
    }); 
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  verOrden( orden ){
    if( orden != null ){
      this.idOrdenDist = orden.id;
      let ruta = `apps/carga/controlar-orden/${ this.idOrdenDist }`;
      this._router.navigate([ ruta ]);
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
    
    this.getAllOrdenes(); 
  }
}
