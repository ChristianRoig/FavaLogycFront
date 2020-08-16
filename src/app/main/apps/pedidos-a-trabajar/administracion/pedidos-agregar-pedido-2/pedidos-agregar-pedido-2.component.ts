import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAgregarPedido2Service } from './pedidos-agregar-pedido-2.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PedidosListaService } from '../pedidos-lista/pedidos-lista.service';

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

export interface ListaDatosDeEntrega {
  listaDatosDeEntrega: [
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
      listaPedidoDetalle: [
          
          {
            id: number,
            codigoArticulo: string,
            codigoCliente: string,
            codigoDeBarras: string,
            nombreArticulo: string,
            nombreCliente: string,
            numeroCbte: string,
            tipoCbte: string
          }
          
      ]
    }
  ]
}

export interface Articulos {
  
  
}

@Component({
  selector: 'app-pedidos-agregar-pedido-2',
  templateUrl: './pedidos-agregar-pedido-2.component.html',
  styleUrls: ['./pedidos-agregar-pedido-2.component.scss']
})

export class PedidosAgregarPedido2Component implements OnInit {

  modo: string;

  subParametros: Subscription;
  selection = new SelectionModel<any>(true, []);

  string: any = {
    listaDatosDeEntrega: [
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
                "id": 1
            }
        },
        sysTransporte: {
            "id": 3
        },
        pedidoTurno: {
            "id": 2
        },
        listaPedidoDetalle: [
            
            {
              id: 117,
              codigoArticulo: "MGENMES032",
              codigoCliente: "MK995",
              codigoDeBarras: "MGENMES032",
              nombreArticulo: "GENOUD MESA REC.180x090 WEN A2",
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
                    "id": 1
                }
            },
            sysTransporte: {
                "id": 3
            },
            pedidoTurno: {
                "id": 2
            },
            listaPedidoDetalle: [
                {
                    id: 114,
                    codigoArticulo: "MGENMES032",
                    codigoCliente: "MK995",
                    codigoDeBarras: "MGENMES032",
                    nombreArticulo: "GENOUD MESA REC.180x090 WEN A2",
                    nombreCliente: "KREPCHUK MARTIN",
                    numeroCbte: "B0008800024195",
                    tipoCbte: "FAC"
                },
                {
                  id: 115,
                  codigoArticulo: "MGENMES032",
                  codigoCliente: "MK995",
                  codigoDeBarras: "MGENMES032",
                  nombreArticulo: "GENOUD MESA REC.180x090 WEN A2",
                  nombreCliente: "KREPCHUK MARTIN",
                  numeroCbte: "B0008800024195",
                  tipoCbte: "FAC"
                }
            ]
        }
         
    ]
  };
  
  displayedColumnsArticulos: string[] = ['select','codigoArticulo','nombre','codigoDeBarras'];
  displayedColumnsPedidoDetalle: string[] = ['codigoArticulo','nombre','codigoDeBarras', 'mover'];


  // dataSourceArticulos = ELEMENT_DATA_ARTICULOS;
  dataSourceArticulos: any;
  dataSourceDatosDeEntrega: any;

  constructor(private _router: Router,
              private _service: PedidosAgregarPedido2Service, 
              private _pedidosListaService: PedidosListaService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe(params => {
      this.modo = params['modo'];
    })
    
    this.dataSourceArticulos = JSON.parse(localStorage.getItem('AddPedido'))._selected;
    this.dataSourceDatosDeEntrega = this.string.listaDatosDeEntrega;
    console.log(this.dataSourceArticulos);
    console.log(this.dataSourceDatosDeEntrega);
  }

  mover(tabla: number){
    this.dataSourceDatosDeEntrega[0]
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  volver(){
    let ruta = `apps/pedidos/administracion/pedidos-lista`;
    localStorage.removeItem('AddPedido');
    this._router.navigate([ruta]);
  }
}
