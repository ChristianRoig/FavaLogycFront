import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { indexOf } from 'lodash';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { HttpErrorResponse } from '@angular/common/http';
import { DATOS_ENTREGA } from 'app/interfaces/datos-entrega';

import { AgregarDatosEntregaComponent } from './agregar-datos-entrega/agregar-datos-entrega.component';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { PedidosCrear2Service } from './pedidos-crear-2.service';

export interface Articulo {  // se usa 
  id: number,
  codigoArticulo: string,
  codigoCliente: string,
  codigoDeBarras: string,
  nombreArticulo: string,
  nombreCliente: string,
  numeroCbte: string,
  tipoCbte: string
}

export interface DatosDeEntrega { // se usa
  datos : Array< ListaDatosDeEntrega>
}

export interface ListaDatosDeEntrega {
  id: number,
  direccion: string,
  fechaDeEntrega: string,
  telefono: string,
  mail: string,
  contacto: string,
  observaciones: string,
  sysLocalidad: {
      id: number,
      sysProvincia: {
          id: number,
      }
  },
  sysTransporte: {
      id: number,
  },
  pedidoTurno: {
      id: number,
  },
  listaPedidoDetalle: Array <Articulo>
}

@Component({
  selector: 'app-pedidos-agregar-pedido-2',
  templateUrl: './pedidos-crear-2.component.html',
  styleUrls: ['./pedidos-crear-2.component.scss']
})

export class PedidosCrear2Component implements OnInit {

  @ViewChild(MatTable) tabla1: MatTable<Articulo>;
  @ViewChildren('tabla2') tabla2: QueryList<MatTable<Articulo>>;;

  modo: number;
  titulo: string;

  subParametros: Subscription;
  selection = new SelectionModel<Articulo>(true, []);

  idTipoCbte: number;
  tipoCbte: string;
  numeroCbte: string;
  codigoCliente: string;
  nombreCliente: string;

  listaDatosVacia: DatosDeEntrega = {
    datos: []
  };
  
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre'];
  displayedColumnsPedidoDetalle: string[] = ['codigoArticulo','nombre', 'mover'];

  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: Array<Articulo> = [];
  dataSourceDatosDeEntrega: DatosDeEntrega;

  constructor(private _router: Router,
              private _service: PedidosCrear2Service, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe(params => {
      this.modo = params['modo'];
    })
    
    if(this.modo < 1) {
      this.titulo = 'Agregar Pedido'
      this.dataSourceArticulos = JSON.parse(localStorage.getItem('AddPedido'))._selected;
      this.dataSourceDatosDeEntrega = this.listaDatosVacia;
      
      this.idTipoCbte = JSON.parse(localStorage.getItem('IdTipo'));
      this.tipoCbte = this.dataSourceArticulos[0].tipoCbte;
      this.numeroCbte = this.dataSourceArticulos[0].numeroCbte;
      this.codigoCliente = this.dataSourceArticulos[0].codigoCliente;
      this.nombreCliente = this.dataSourceArticulos[0].nombreCliente;
    } else {
      this.titulo = 'Modificar Pedido'
      this.dataSourceArticulos = [];
      
      this.dataSourceDatosDeEntrega = this.listaDatosVacia;

      this.getDatosDeEntrga();
    }
  }
  
  getDatosDeEntrga(){
    this._service.getDatosDeEntregaUpd(this.modo).subscribe((params) => {

      this.dataSourceDatosDeEntrega.datos = params;
      
      this.tipoCbte      = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].tipoCbte;
      this.numeroCbte    = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].numeroCbte;
      this.codigoCliente = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].codigoCliente;
      this.nombreCliente = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].nombreCliente;
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
          let titulo = 'Error al cargar los Pedidos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })
  }

  procesar(){
    if (this.modo < 1){
      this.agregar();
    } else {
      this.modificar();
    }
  }

  agregar(){
    this._service.postPedidos(this.dataSourceDatosDeEntrega.datos, 1, this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].numeroCbte).subscribe(data => {
      console.log(data);
      // this.dataSourceDatosDeEntrega = params;

      let ruta = `apps/pedidos/lista-articulos`;
      localStorage.removeItem('AddPedido');
      localStorage.removeItem('datoEntrega');
      localStorage.removeItem('IsTipo');
      this._router.navigate([ruta]);
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
          let titulo = 'Error al Agregar los Pedidos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }
  
  modificar(){
    this._service.putPedidos(this.dataSourceDatosDeEntrega.datos).subscribe(data => {
      console.log(data);
      let ruta = `apps/pedidos/pedidos-lista`;
      localStorage.removeItem('AddPedido');
      localStorage.removeItem('datoEntrega');
      localStorage.removeItem('IsTipo');
      this._router.navigate([ruta]);
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
          let titulo = 'Error al Modificar los Pedidos';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });
  }
  
  moverDesdeDatosEntrega(event: Event, element: any, indexItem:any, indexElement: any){
    
    let indexTo = (event.target as HTMLSelectElement).value;
    
    let art: Articulo = element;
    
    switch (indexTo) {
      case '-1' : {
        this.dataSourceArticulos.push(art);
        this.dataSourceDatosDeEntrega.datos[indexItem].listaPedidoDetalle.splice(indexElement,1);
        break;
      }
      case '-2' : {
        break;
      }
      default: {
        this.dataSourceDatosDeEntrega.datos[indexTo].listaPedidoDetalle.push(art);
        this.dataSourceDatosDeEntrega.datos[indexItem].listaPedidoDetalle.splice(indexElement,1);

      }
    }

    if(this.dataSourceDatosDeEntrega.datos[indexItem].listaPedidoDetalle.length === 0){
      this.dataSourceDatosDeEntrega.datos.splice(indexItem,1)
    }

    this.render();
    
  }

  moverDesdeArticulos(event: Event){

    let indexItems = (event.target as HTMLSelectElement).value    

    switch (indexItems) {
      case '-1' : {
        break;
      }
      default: {
        for (let art of this.selection.selected) {
          this.dataSourceDatosDeEntrega.datos[indexItems].listaPedidoDetalle.push(art);
          
          let indexToSplice = this.dataSourceArticulos.indexOf(art);
          this.dataSourceArticulos.splice(indexToSplice,1);

        }
        this.selection.clear();
      }
    }

    this.render();
  }

  render(){
    this.tabla1.renderRows();
    this.tabla2.forEach( (item:MatTable<Articulo>) => {

      item.renderRows();
    });
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
          this.volver();
        }
    });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceArticulos.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceArticulos.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Articulo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  volver(){
    if (this.modo < 1){
      this.volverIns();
    } else {
      this.volverUpd();
    }
  }

  volverIns(){
    let ruta = `apps/pedidos/crear-pedido`;
    localStorage.removeItem('AddPedido');
    this._router.navigate([ruta]);
  }

  volverUpd(){
    let ruta = `apps/pedidos/ver-pedido/${this.modo}`;
    localStorage.removeItem('AddPedido');
    console.log(ruta);
    this._router.navigate([ruta]);
  }

  verDatoEntrega(item){
    console.log(item);

    let dialogRef = this._dialog.open(AgregarDatosEntregaComponent, {
      width: window.innerWidth+'px',
      data: {
        option: 'view',
        articulos: this.selection.selected,
        item: item
      } 
    });
  }

  modificarDatoEntrega(item, indexItem){


    console.log("indexItem");
    console.log(indexItem);

    let dialogRef = this._dialog.open(AgregarDatosEntregaComponent, {
      width: window.innerWidth+'px',
      data: {
        option: 'upd',
        articulos: this.selection.selected,
        item: item
      } 
    });
    
    dialogRef.afterClosed()
      .subscribe(result => {

        let datos = this.dataSourceDatosDeEntrega;
        console.log('antes');
        console.log(datos);
        
        if(JSON.parse(localStorage.getItem('datoEntrega'))){
          
          this.dataSourceDatosDeEntrega.datos.splice(indexItem,1,JSON.parse(localStorage.getItem('datoEntrega'))); 
          
          console.log('despues');
          console.log(this.dataSourceDatosDeEntrega);

          this.render();
          this.selection.clear();
        }
      });
  }
  
  
  agregarDatoEntrega() {

    let dialogRef = this._dialog.open(AgregarDatosEntregaComponent, {
      width: window.innerWidth+'px',
      data: {
        option: 'add',
        articulos: this.selection.selected,
      } 
    });
    
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(JSON.parse(localStorage.getItem('datoEntrega')));
        if(JSON.parse(localStorage.getItem('datoEntrega'))){
          
          this.dataSourceDatosDeEntrega.datos.push(JSON.parse(localStorage.getItem('datoEntrega')));
          for (let art of this.selection.selected) {
            
            let indexToSplice = this.dataSourceArticulos.indexOf(art);
            this.dataSourceArticulos.splice(indexToSplice,1);
            
            console.log(JSON.parse(localStorage.getItem('datoEntrega')));
          }
          
          this.selection.clear();
          this.render();

        }
      });
  }
}
