import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAgregarPedido2Service } from './pedidos-agregar-pedido-2.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PedidosListaService } from '../pedidos-lista/pedidos-lista.service';
import { Articulos } from '../pedidos-lista/pedidos-lista.component';
import { MatTable } from '@angular/material/table';
import { indexOf } from 'lodash';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PedidosDatosEntregaComponent } from '../pedidos-venta-visualizacion/pedidos-datos-entrega/pedidos-datos-entrega.component';

export interface PeriodicElement {
  Id: number;
  Tipo: string;
  CodigoArticulo: string;
  Nombre: string;
  Comprobante: string;
  FechaEntrega: string;
  Prov: string;
  Loc: string;
  Estado: string;
  Etapa: string;
  Lote: number;
}

export interface Articulo {
  id: number,
  codigoArticulo: string,
  codigoCliente: string,
  codigoDeBarras: string,
  nombreArticulo: string,
  nombreCliente: string,
  numeroCbte: string,
  tipoCbte: string
}


export interface DatosDeEntrega {
  datos : Array< ListaDatosDeEntrega>
}


export interface ListaDatosDeEntrega 
    {
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
  templateUrl: './pedidos-agregar-pedido-2.component.html',
  styleUrls: ['./pedidos-agregar-pedido-2.component.scss']
})

export class PedidosAgregarPedido2Component implements OnInit {

  @ViewChild(MatTable) tabla1: MatTable<Articulo>;
  @ViewChildren('tabla2') tabla2: QueryList<MatTable<Articulo>>;;

  modo: string;

  subParametros: Subscription;
  selection = new SelectionModel<Articulo>(true, []);

  tipoCbte: string;
  numeroCbte: string;
  codigoCliente: string;
  nombreCliente: string;

  listaArticulos: Array<Articulo> = [{
    id: 114,
    codigoArticulo: "MGENMES032",
    codigoCliente: "MK995",
    codigoDeBarras: "MGENMES032",
    nombreArticulo: "Lapiz",
    nombreCliente: "KREPCHUK MARTIN",
    numeroCbte: "B0008800024195",
    tipoCbte: "FAC"
  },
  {
    id: 115,
    codigoArticulo: "MGENMES032",
    codigoCliente: "MK995",
    codigoDeBarras: "MGENMES032",
    nombreArticulo: "Goma",
    nombreCliente: "KREPCHUK MARTIN",
    numeroCbte: "B0008800024195",
    tipoCbte: "FAC"
  }];

  listaDatos: DatosDeEntrega = {
    datos: [
      {
        id: 1,
        direccion: "Calle falsa 123",
        fechaDeEntrega: "15/08/2020 12:36:00",
        telefono: "060606",
        mail: "pepe@grillojr",
        contacto: "chespirito",
        observaciones: "Prueba 2",
        sysLocalidad: {
            id: 6,
            sysProvincia: {
                id: 1
            }
        },
        sysTransporte: {
            id: 3
        },
        pedidoTurno: {
            id: 2
        },
        listaPedidoDetalle: [
            
            {
              id: 117,
              codigoArticulo: "MGENMES032",
              codigoCliente: "MK995",
              codigoDeBarras: "MGENMES032",
              nombreArticulo: "Cartuchera",
              nombreCliente: "KREPCHUK MARTIN",
              numeroCbte: "B0008800024195",
              tipoCbte: "FAC"
            }
            
        ]
      },
        {
            id: 3,
            direccion: "Avenida Siempre Viva 742",
            fechaDeEntrega: "13/08/2020 12:36:00",
            telefono: "123",
            mail: "pepe@grillojr",
            contacto: "prueba",
            observaciones: "ejemplo de  prueba nueva api",
            sysLocalidad: {
                id: 1468,
                sysProvincia: {
                    id: 1
                }
            },
            sysTransporte: {
                id: 3
            },
            pedidoTurno: {
                id: 2
            },
            listaPedidoDetalle: [
                {
                    id: 114,
                    codigoArticulo: "MGENMES032",
                    codigoCliente: "MK995",
                    codigoDeBarras: "MGENMES032",
                    nombreArticulo: "Regla",
                    nombreCliente: "KREPCHUK MARTIN",
                    numeroCbte: "B0008800024195",
                    tipoCbte: "FAC"
                },
                {
                  id: 115,
                  codigoArticulo: "MGENMES032",
                  codigoCliente: "MK995",
                  codigoDeBarras: "MGENMES032",
                  nombreArticulo: "Sacapuntas",
                  nombreCliente: "KREPCHUK MARTIN",
                  numeroCbte: "B0008800024195",
                  tipoCbte: "FAC"
                }
            ]
        }
      ]
  };
  

  listaDatosVacia: DatosDeEntrega = {
    datos: []
  };
  
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre','codigoDeBarras'];
  displayedColumnsPedidoDetalle: string[] = ['codigoArticulo','nombre','codigoDeBarras', 'mover'];


  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: Array<Articulo> = [];
  dataSourceDatosDeEntrega: DatosDeEntrega;

  constructor(private _router: Router,
              private _service: PedidosAgregarPedido2Service, 
              private _pedidosListaService: PedidosListaService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe(params => {
      this.modo = params['modo'];
    })
    
    if(this.modo === 'ins'){
      this.dataSourceArticulos = JSON.parse(localStorage.getItem('AddPedido'))._selected;
      this.dataSourceDatosDeEntrega = this.listaDatosVacia;
      
      this.tipoCbte = this.dataSourceArticulos[0].tipoCbte;
      this.numeroCbte = this.dataSourceArticulos[0].numeroCbte;
      this.codigoCliente = this.dataSourceArticulos[0].codigoCliente;
      this.nombreCliente = this.dataSourceArticulos[0].nombreCliente;
    } else {
      
      this.dataSourceArticulos = [];
      this.dataSourceDatosDeEntrega = this.listaDatos;

      this.tipoCbte      = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].tipoCbte;
      this.numeroCbte    = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].numeroCbte;
      this.codigoCliente = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].codigoCliente;
      this.nombreCliente = this.dataSourceDatosDeEntrega.datos[0].listaPedidoDetalle[0].nombreCliente;
    }

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
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    localStorage.removeItem('AddPedido');
    this._router.navigate([ruta]);
  }
}
