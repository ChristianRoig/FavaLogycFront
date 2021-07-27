import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { ListaRemitosService } from './lista-remitos.service';

interface Estados{
  valor: string;
  vista: string;
}
@Component({  
  selector: 'app-lista-remitos',  
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.scss']
})


export class ListaRemitosComponent implements OnInit {

  @ViewChild('buscarRemito') buscarRemitoInput: ElementRef;

  displayedColumns: string[] = ['id', 'nroComprobante', 'fechaAlta', 'direccion', 'transporte', 'cantArticulos', 'info', 'accion'];
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);

  busqueda: number = null;
  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'nroCbte';
  order: string = 'asc';

  estados: Estados [] = [
    { valor: "ACTIVO", vista: "Activos" },
    { valor: "TODOS", vista: "Todos" }
  ];

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _listaRemitosService: ListaRemitosService,
              private _dialog: MatDialog,
              ) {  }

  ngOnInit(): void {

    this.getAllRemitosSinDistribucion();
  }

  //@Debounce(50)  
  searchRemito() {
    this.busqueda = this.buscarRemitoInput.nativeElement.value;
    if(this.busqueda < 1 ){
      this.busqueda = null;
      this.getAllRemitosSinDistribucion( );
    }
  }
  
  getAllRemitosSinDistribucion( ){
    this.columna = 'id';
    this.order = 'desc';
    this._listaRemitosService.getRemitosSinDistribucion( this.page, this.size, this.columna, this.order ) .subscribe( data => {
      console.log(data);
      console.log(data.totalRegistros);
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
  
  getRemitosPorEstado( estado: string){
    if(estado === "ACTIVO"){
      this.getAllRemitosSinDistribucion();
    }
    if(estado === "TODOS"){
      this._listaRemitosService.getAllRemitos( this.page, this.size, this.columna, this.order ) .subscribe( data => {
        console.log(data);
        console.log(data.totalRegistros);
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
  }

  getRemitoPorId(){
    let resultado: any = [];
    console.log( "busqueda", this.busqueda );
    this._listaRemitosService.getRemitoPorId( this.busqueda ).subscribe( data => {
      resultado.push( data );
      console.log( resultado );
      this.dataSource2 = resultado;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error");
      } else {
        let errStatus = err.status;
        if (errStatus == 0){
          let titulo = 'Error de Servidor';
          let mensaje = "Por favor comunicarse con Sistemas";
          this.mostrarError(errStatus, titulo, mensaje);
        } else {
          let titulo = 'No encontrado';
          let mensaje = "El remito no existe";
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  verRemito( remito ){ //redireccionar 
    if( remito != null ){
      let idRemito = remito.id;
      let ruta = `remitos/ver-remito/${ idRemito }`;
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
    dialogRef.afterClosed()
      .subscribe( () => {
          if (errStatus != 0) {

          } else {
            this._router.navigate(['']);
          }
      });
  }

  crearRemito() {
    console.log(this.selection);
    localStorage.setItem('Remito',JSON.stringify(this.selection));
    let ruta = `remitos/crear-remito`;
    this._router.navigate([ruta]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource2.forEach(row => this.selection.select(row));
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

  sortData( event ) {
    this.page = 0;
    this.columna = event.active; 
    if (event.direction !== "")
        this.order = event.direction;
    
    this.getAllRemitosSinDistribucion( );
  }

  paginar(e: any){
    console.log(e);
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.getAllRemitosSinDistribucion( ); 
  }
}
