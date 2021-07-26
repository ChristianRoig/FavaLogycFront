import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { AgregarDatosEntregaComponent } from './agregar-datos-entrega/agregar-datos-entrega.component';
import { PedidosCrear2Service } from './pedidos-crear-2.service';

import { animate } from '@angular/animations';
import { DATOS_ENTREGA } from 'app/shared/interfaces/datos-entrega';
import { indexOf } from 'lodash';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export interface Articulo {  // se usa 
  idDetalleTango: number,
  codigoArticulo: string,
  codigoCliente: string,
  codigoDeBarras: string,
  codigoDeposito: string,
  articulo: {
    codigoArticulo: string
  },
  nombreArticulo: string,
  nombreCliente: string,
  numeroCbte: string,
  tipoCbte: string
}

export interface DatosDeEntrega { // se usa
  listadoDatosDeEntrega : Array< ListaDatosDeEntrega>
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
  listaPedidoDetalle: Array <Articulo>; 
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
  procesarDatos: boolean = false;

  listaDatosVacia: DatosDeEntrega = {
    listadoDatosDeEntrega: []
  };
  //, 'deposito'
  displayedColumnsArticulos: string[] = ['select', 'codigoArticulo', 'nombre', 'deposito', 'info'];
  displayedColumnsPedidoDetalle: string[] = ['codigoArticulo', 'nombre', 'mover'];

  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: Array<Articulo> = [];
  dataSourceDatosDeEntrega: DatosDeEntrega;

  constructor(private _router: Router,
              private _service: PedidosCrear2Service, 
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe( params => {
      this.modo = params['modo'];
    })
    
    if (this.modo < 1) {
      this.titulo = 'Agregar Pedido'

      this.dataSourceArticulos = JSON.parse(localStorage.getItem('AddPedidoC'));//asi anda desde comprobantes a programar
      console.log("Articulos sin añadir | ",this.dataSourceArticulos);

      if (this.dataSourceArticulos == null){
        this.dataSourceArticulos = JSON.parse(localStorage.getItem('AddPedido'))._selected;//asi me anda desde pedido-crear1
        console.log(this.dataSourceArticulos);
      }
      
      this.dataSourceDatosDeEntrega = this.listaDatosVacia;
      
      this.idTipoCbte = JSON.parse(localStorage.getItem('IdTipo'));
      this.tipoCbte = this.dataSourceArticulos[0].tipoCbte;
      this.numeroCbte = this.dataSourceArticulos[0].numeroCbte;
      this.codigoCliente = this.dataSourceArticulos[0].codigoCliente;
      this.nombreCliente = this.dataSourceArticulos[0].nombreCliente;
      localStorage.setItem("numeroCbte", this.numeroCbte);
    } else {
      this.titulo = 'Modificar Pedido'
      this.dataSourceArticulos = [];
      
      this.dataSourceDatosDeEntrega = this.listaDatosVacia;

      this.getDatosDeEntrga();
    }
  }
  
  getDatosDeEntrga(){
    this._service.getDatosDeEntregaUpd(this.modo).subscribe((params) => {

      this.dataSourceDatosDeEntrega.listadoDatosDeEntrega = params;
      
      this.tipoCbte      = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[0].tipoCbte;
      this.numeroCbte    = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[0].numeroCbte;
      this.codigoCliente = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[0].codigoCliente;
      this.nombreCliente = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[0].nombreCliente;
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
    // borro un dato necesario para "agregar datos" en este punto que ya no lo necesito
    localStorage.removeItem("indexLocalidad");
    if (this.modo < 1){
      this.agregar();
    } else {
      this.modificar();
    }
  }
 //this.datoEntrega.sysLocalidad.id 
  agregar(){

    console.log("this.dataSourceDatosDeEntrega.datos ||", this.dataSourceDatosDeEntrega);

    let listaPedidoDetalleAUX = [];
 
    for ( let i = 0 ; i < this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle.length; i++){
      
      const idDetalleTango  = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[i].idDetalleTango;
      const codigoDeposito  = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[i].codigoDeposito;
      const { codigoArticulo }  = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[i];
      const articulo = { codigoArticulo };

      let  datos   = { 
        idDetalleTango,
        codigoDeposito,
        articulo
      };

      listaPedidoDetalleAUX.push(  datos  );
    
    } 

    console.log("listaPedidoDetalleXD", listaPedidoDetalleAUX);
    
    let listaPedidoDetalle = listaPedidoDetalleAUX;
    
    console.log("listaPedidoDetalle", listaPedidoDetalle);

    const { numeroCbte } =  this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle[0]; 
    const { fechaDeEntrega,telefono, mail, direccion,contacto, observaciones,sysLocalidad,  sysTransporte, pedidoTurno } = this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0];
   
    let obj = {
            "id": null,
            direccion,
            fechaDeEntrega,
            telefono,
            mail,
            contacto,
            observaciones,
            sysLocalidad,
            sysTransporte,
            pedidoTurno,
            listaPedidoDetalle
        }
    
    let listaDatosDeEntrega = [];
    listaDatosDeEntrega.push(obj);
    
    console.log({numeroCbte});
    console.log({listaDatosDeEntrega});
    this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[0].listaPedidoDetalle = [];


    this._service.postPedidos( listaDatosDeEntrega, 1, numeroCbte ).subscribe(data => {
        console.log(data);
        // this.dataSourceDatosDeEntrega = params;
  
        localStorage.removeItem('AddPedido');
        localStorage.removeItem('datoEntrega');
        localStorage.removeItem('IsTipo');
        
        let ruta = `pedidos/lista-comprobantes`;
        this._router.navigate([ruta]);
    },
    (err: HttpErrorResponse) => {
      console.error({err})
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
    this._service.putPedidos(this.dataSourceDatosDeEntrega.listadoDatosDeEntrega).subscribe(data => {
      console.log(data);
      localStorage.removeItem('AddPedido');
      localStorage.removeItem('datoEntrega');
      localStorage.removeItem('IsTipo');

      let ruta = `pedidos/lista-comprobantes`;
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
        this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[indexItem].listaPedidoDetalle.splice(indexElement,1);
        break;
      }
      case '-2' : {
        break;
      }
      default: {
        this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[indexTo].listaPedidoDetalle.push(art);
        this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[indexItem].listaPedidoDetalle.splice(indexElement,1);

      }
    }

    if(this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[indexItem].listaPedidoDetalle.length === 0){
      this.dataSourceDatosDeEntrega.listadoDatosDeEntrega.splice(indexItem,1)
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
          
          this.dataSourceDatosDeEntrega.listadoDatosDeEntrega[indexItems].listaPedidoDetalle.push(art);
          
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idDetalleTango + 1}`;
  }

  volver(){
    if (this.modo < 1){
      this.volverIns();
    } else {
      this.volverUpd();
    }
  }

  volverIns(){
    //let ruta = `apps/pedidos/crear-pedido`;
    let ruta = `pedidos/lista-comprobantes`;
    localStorage.removeItem('AddPedido');
    this._router.navigate([ruta]);
  }

  volverUpd(){
    let ruta = `pedidos/ver-pedido/${this.modo}`;
    localStorage.removeItem('AddPedido');
    console.log(ruta);
    this._router.navigate([ruta]);
  }

  verDatoEntrega(item){
    console.log(item);

    let dialogRef = this._dialog.open( AgregarDatosEntregaComponent, {

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
          
          this.dataSourceDatosDeEntrega.listadoDatosDeEntrega.splice(indexItem,1,JSON.parse(localStorage.getItem('datoEntrega'))); 
          
          console.log('despues');
          console.log(this.dataSourceDatosDeEntrega);

          this.render();
          this.selection.clear();
        }
      });
      this.procesarDatos = true;
  }
  
  
  agregarDatoEntrega() {

    let dialogRef = this._dialog.open(AgregarDatosEntregaComponent, {
      data: {
        option: 'add',
        articulos: this.selection.selected,
      } 
    });
    
    dialogRef.afterClosed()
      .subscribe(result => {
        console.log("LOS DATOS QUE YA VIENEN");
        console.log(JSON.parse(localStorage.getItem('datoEntrega')));
        if(JSON.parse(localStorage.getItem('datoEntrega'))){
          
          this.dataSourceDatosDeEntrega.listadoDatosDeEntrega.push(JSON.parse(localStorage.getItem('datoEntrega')));

          for (let art of this.selection.selected) {
            
            let indexToSplice = this.dataSourceArticulos.indexOf(art);
            this.dataSourceArticulos.splice(indexToSplice, 1);
            
            //console.log(JSON.parse(localStorage.getItem('datoEntrega')));
          }
          //console.log("this.dataSourceArticulos", this.dataSourceArticulos, this.dataSourceArticulos.length);
          this.selection.clear();
          this.render();
          this.procesarDatos = true;
        }
      });
  }
}
