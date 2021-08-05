import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CrearOrdenDistribucionService } from './crear-orden-distribucion.service';
import { ConfirmarOrdenDeDistribucionComponent } from './confirmar-ordenDist/confirmar-ordenDist.component';

export interface BodyDetalle{

  idTipo : number;
  idTurno : number;
  idOrigen : number;
  idEtapa : number;
  idProvincia : number;
  idLocalidad : number;
  desdePedido : string;
  hastaPedido : string;
  idLote : number;
}

@Component({  
  selector: 'app-crear-orden-distribucion',  
  templateUrl: './crear-orden-distribucion.component.html',
  styleUrls: ['./crear-orden-distribucion.component.scss']
})

export class CrearOrdenDistribucionComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;

  displayedColumns: string[] = ['select', 'id', 'comprobante', 'fechaAlta', 'cantArticulos'];
  dataSource2: any;
  selection = new SelectionModel<any>(true, []);
  mostrarFecha = false;
  mostrarTipo = false;
  busqueda: string = "";

  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'nroCbte';
  order: string = 'desc';
  
  toAdd = new Array();

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _crearOrdenDistribucionService: CrearOrdenDistribucionService,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
    
    // this.resetFiltros();    
    this.getAllRemitosNuevos( );
    
  }
  
  getAllRemitosNuevos( ){
    let body = {
      "nroCbte": null,
      "fechaDesde": null,
      "fechaHasta": null,
      "idEstado": 1
    }
    this._crearOrdenDistribucionService.getAllRemitosNuevos( body, this.page, this.size, this.columna, this.order ) .subscribe( data => {
      console.log(data);
      //console.log(data.totalRegistros);
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

            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  crearOrdenDeDistribucion() {
    console.log( this.selection );

    let dialogRef = this._dialog.open( ConfirmarOrdenDeDistribucionComponent, {
      data:{
            vengoDeCrear: true,
            selection: this.selection
      }
    });
  }

  navegarAlistaOrdenes(){
    let ruta = `distribucion/ordenes-distribucion`;
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
  checkboxLabel(row): string {
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
    
  }

  activarFecha(){
    this.mostrarFecha = !this.mostrarFecha;
  }

  activarTipo(){
    this.mostrarTipo = !this.mostrarTipo;
  }

  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.getAllRemitosNuevos();
  }

  verPedido( idPedido, idCbte ){                          // falta que el back agregue datos para hacer la navegacion
    localStorage.setItem('vengoDeCbte', "true" );
    localStorage.setItem('idCbte', idCbte );
    this._router.navigate([ `pedidos/ver-pedido/${ idPedido }` ]);
  }
}
