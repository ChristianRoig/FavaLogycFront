import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

//componentes      
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
//import { VerImpresorasComponent } from '../../lotes/lista-lotes/ver-impresoras/ver-impresoras.component'; 

//services
import { RemitosConfirmarService } from './remitos-confirmar.service';

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
export interface BodyRemito {
  idTransporte: number,
  idDeposito: number,
  idTalonario: number,
  listaIdDetalle: number []
}

@Component({
  selector: 'app-remitos-confirmar',
  templateUrl: './remitos-confirmar.component.html',
  styleUrls: ['./remitos-confirmar.component.scss']
})

export class RemitosConfirmarComponent implements OnInit {

  @ViewChild('buscarNombreLote') buscarNombreLote: ElementRef;


  subParametros: Subscription;
  
  displayedColumns: string[] = ['select', 'CodigoArticulo', 'Comprobante', 'Fecha-Entrega', 'Cliente', 'Localidad', 'Dir. de entrega'];


  dataSource2: any;
  cantidad: number;
  idCabecera: any;
  picker: Date;
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array<number>();

  
  filtroTransportes: any;
  selectedTransporte: any = 0;
  
  filtroTalonarios: any;
  selectedTalonario: any = 0;
  
  filtroDepositosCarga: any;
  selectedDepositoCarga: any = 0;

  proxCbte: string;

  nombreLote: string;

  constructor(private _router: Router,
              private _serviceRemitosConfirmar: RemitosConfirmarService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.getfiltros();

    this.dataSource2 = JSON.parse(localStorage.getItem('Remitir'))._selected;
    console.log(this.dataSource2);

    this.cantidad = this.dataSource2.length;

    this.picker =  new Date();
  }
  
  searchNombreLote() {

    this.nombreLote = this.buscarNombreLote.nativeElement.value;

  }

  selectTransporte(event: Event) {
    this.selectedTransporte = (event.target as HTMLSelectElement).value;
    console.log("this.selectedTransporte",this.selectedTransporte);
  }
  
  selectTalonario(event: Event) {
    this.selectedTalonario = (event.target as HTMLSelectElement).value;
    this.getUltNroTalonario();
    console.log("this.selectedTalonario",this.selectedTalonario);
  }
  
  selectDepositoCarga(event: Event) {
    this.selectedDepositoCarga = (event.target as HTMLSelectElement).value;
    console.log("this.selectedDepositoCarga", this.selectedDepositoCarga);
  }

  getfiltros(){

    this._serviceRemitosConfirmar.getAllDepostitosCarga().subscribe(params => {
      this.filtroDepositosCarga = params.datos;
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
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })
    
    this._serviceRemitosConfirmar.getAllTalonarios().subscribe(params => {
      this.filtroTalonarios = params.datos;
      this.proxCbte = '';
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
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })

    this._serviceRemitosConfirmar.getAllTransportes().subscribe(params => {
      this.filtroTransportes = params.datos;
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
          let titulo = 'Error al cargar filtros';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    })
  }

  getUltNroTalonario(){

    this.filtroTalonarios.forEach( (talonario: any) => {
      
      console.log(talonario.nroTalonario.toString());
      console.log(this.selectedTalonario);

      if ( talonario.nroTalonario.toString() === this.selectedTalonario ) {
        this.proxCbte = talonario.ultimoId;
        
      } else {
        this.proxCbte = '';
      }
      
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
          this._router.navigate(['']);
        }
    });
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  remitir(){
    console.log(this.dataSource2);
    for (let elemento of this.dataSource2){
      this.toAdd.push(elemento.id);
    }   
    let idTransporte = parseInt(this.selectedTransporte, 10);
    let idTalonario = parseInt(this.selectedTalonario, 10);
    let idDeposito = parseInt(this.selectedDepositoCarga, 10);

    let body: BodyRemito = {
      idTransporte: idTransporte,
      idDeposito: idDeposito,
      idTalonario: idTalonario,
      listaIdDetalle: this.toAdd
    }
    console.log(body);

    this._serviceRemitosConfirmar.generarRemito( body ).subscribe(params => {
      console.log("entró");
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
          let titulo = 'Error al crear remito';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });

    setTimeout(() => {                          
      this.navegarAlistaRemitos();
      }, 1000);
  }
  
  navegarAlistaRemitos(){
    let ruta = `apps/remitos/lista-remitos`;
    this._router.navigate([ruta]);
  }
  
  volver(){
    let ruta = `apps/remitos/crear-remito`;
    this._router.navigate([ruta]);
  }

}
