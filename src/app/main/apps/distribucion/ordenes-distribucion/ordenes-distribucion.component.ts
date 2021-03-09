import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { HttpErrorResponse } from '@angular/common/http';

//fuse
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

//services
import { OrdenesDistribucionService } from './ordenes-distribucion.service';

export interface Orden {
  id: number;
  Nombre: string;
  FechaAlta: string;
}

@Component({  
  selector: 'app-ordenes-distribucion',  
  templateUrl: './ordenes-distribucion.component.html',
  styleUrls: ['./ordenes-distribucion.component.scss']
})

export class OrdenesDistribucionComponent implements OnInit {

  //@ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarOrden') buscarOrdenInput: ElementRef;

  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'cantArticulos', 'cantArticulosACargar', 'cantRemitos', 'estado', 'seleccionar'];
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);
  selecccionDeEstado: string;

  idOrdenDist: number = null;
  orden: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 10;
  columna: string = 'id';
  order: string = 'asc';

  mensaje: string;
  filtroFechas: boolean;
  filtroInactivos: boolean;

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _ordenesDistribucionService: OrdenesDistribucionService,
              private _dialog: MatDialog
              ) { }

  ngOnInit(): void {
    
    this.getAllOrdenes();
  }
  
  buscarOrdenPorId() {
    let resultado: any = [];
    this._ordenesDistribucionService.getOrdenById( this.idOrdenDist ).subscribe( data => {
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

  getAllOrdenes() {
    this._ordenesDistribucionService.getAllOrdenes( this.page, this.size, this.columna, this.order ).subscribe( data => {
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
            let titulo = 'Error al buscar una orden';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
    }); 
  }

  /* eliminarOrden() {
    this._ordenesDistribucionService.eliminarOrden( this.idOrdenDist ).subscribe( data => {
        console.log(data);
        //this.dataSource2 = data.datos;
        //this.length = data.totalRegistros;
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
  } */

  @Debounce(1000)
  searchOrden() {
    this.idOrdenDist = this.buscarOrdenInput.nativeElement.value;
    console.log(this.idOrdenDist);
    if( this.idOrdenDist === 0 || this.idOrdenDist === null){
      this.idOrdenDist = null;
      this.getAllOrdenes();
    }
  }

  activarFechas(){
    this.filtroFechas = !this.filtroFechas;
  }

  toggleMostrarInactivos(){
    this.filtroInactivos = !this.filtroInactivos;
  }

  getSoloFecha(fecha: any){
    return fecha.split(' ')[0];
  }

  verOrden(orden: Orden){ //redireccionar 
    if( orden != null ){
      this.idOrdenDist = orden.id;
      let ruta = `apps/distribucion/ver-orden-distribucion/${ this.idOrdenDist }`;
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
            this.getAllOrdenes;       
          } else {
            this._router.navigate(['']);
          }
      });
  }

  crearOrden() {
    console.log(this.selection);

    localStorage.setItem('orden',JSON.stringify(this.selection));
    
    let ruta = `apps/distribucion/crear-orden-distribucion`;
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

  /** The label for the checkbox on the passed row */
  //checkboxLabel(row?: Articulos): string {
  checkboxLabel( row? ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }  

  sortData( event ) {
    this.page = 0;
    this.columna = event.active;
    
    if (event.direction !== "")
        this.order = event.direction;
    
    this.getAllOrdenes() 
  }

  redirecCrearOrden(){
    let ruta = `apps/distribucion/crear-orden-distribucion`;
    this._router.navigate([ruta]);
  }

  paginar(e: any){
    console.log(e);
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.getAllOrdenes() 
  }
}
