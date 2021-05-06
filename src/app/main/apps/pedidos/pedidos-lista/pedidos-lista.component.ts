import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
//import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

//interfaces
import { FiltroArticulosPedidos } from 'app/interfaces/datos-entrega';

//componets
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { PedidosListaService } from './pedidos-lista.service';

@Component({  
  selector: 'app-pedidos-lista',  
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.scss']
})

export class PedidosListaComponent implements OnInit {

  @ViewChild('buscarCbte') buscarCbteInput: ElementRef;
  @ViewChild('buscarLote') buscarLoteInput: ElementRef;

  displayedColumns: string[] = ['Tipo', 'Comprobante', 'CodigoArticulo', 'NombreArticulo', 'Fecha-Entrega', 'Localidad', 'Provincia', 'Etapa', 'Lote', 'Ver'];
  /* , 'Borrar' */
  
  dataSource2: any;
  /* selection = new SelectionModel<Articulos>(true, []); */

  lote: string = null;
  busqueda: string = "";
  length: number = 0;
  page: number = 0;
  size: number = 50;
  columna: string = 'id'; // 'codigoArticulo';
  order: string = 'desc'; // 'asc';

  mensaje: string;

  body: FiltroArticulosPedidos = {
    idTipo      : null,
    idTurno     : null,
    idOrigen    : null,
    idEstado    : null,
    idEtapa     : null,
    idProvincia : null,
    idLocalidad : null,
    desdePedido : null,
    hastaPedido : null,
    lote        : null,
    desdeLote   : null,
    hastaLote   : null
  }; 

  constructor(private _router: Router, 
              private _fuseSidebarService: FuseSidebarService, 
              private _pedidosListaService: PedidosListaService,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
   
    this.getPedidos( this.body );
  }

  getPedidos( datosFtiltro: FiltroArticulosPedidos ){
   
    console.log( datosFtiltro );
  
    this._pedidosListaService.getPedidoDetalle( datosFtiltro, this.busqueda, this.page, this.size, this.columna, this.order).subscribe(
      data => {
        this.dataSource2 = data.datos;
        this.length = data.totalRegistros;
        console.log("asd", this.dataSource2);
        //this.size = data.totalRegistros;
      },
      (err: HttpErrorResponse) => {
        this.length = 0
        if (err.error instanceof Error) {
          console.log("Client-side error");
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
          } else {
            let titulo = 'Error al listar articulos';
            let mensaje = err.error.message.toString();
            this.mensaje = mensaje;
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    );
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
            /* this.resetFiltros();
            this.getfiltros(); */
            this.getPedidos( this.body );
            
          } else {
            this._router.navigate(['']);
          }
      });
  }

  buscar(){
    this.getPedidos( this.body );  
  }

  @Debounce(1000)  
  searchCbte() {

    this.busqueda = this.buscarCbteInput.nativeElement.value;

    this.page = 0;
    this.columna = 'id';
  }

  @Debounce(1000)  
  searchLote() {

    this.lote = this.buscarLoteInput.nativeElement.value;
    if(this.lote === '')
      this.lote =null;
    this.page = 0;
    this.columna = 'id';
  }

  consultar( id ){
    let ruta = `apps/pedidos/ver-pedido/${ id }`;
    this._router.navigate([ ruta ]);
  }

/*   anular(id){
    let ruta = `apps/pedidos/anular/${id}`;
    console.log(ruta);
    this._router.navigate([ruta]);
  } */

  agregarPedido() {
    let ruta = `apps/pedidos/crear-pedido`;
    console.log(ruta);
    this._router.navigate([ruta]);
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
    
        this.getPedidos( this.body );
  }

  paginar(e: any){
      this.page = e.pageIndex;
      this.size = e.pageSize;
      
      this.getPedidos( this.body );
  }
}
