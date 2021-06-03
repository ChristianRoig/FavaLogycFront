import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

//service
import { ConfirmarRemitoService } from './confirmar-remito.service';

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
  selector: 'app-confirmar-remito',
  templateUrl: './confirmar-remito.component.html',
  styleUrls: ['./confirmar-remito.component.scss']
})

export class ConfirmarRemitoComponent implements OnInit {

  dataSource2: any;
  
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array<number>();

  filtroTransportes: any;
  selectedTransporte: any = 0;
  
  filtroTalonarios: any;
  selectedTalonario: any = 0;
  
  filtroDepositosCarga: any;
  selectedDepositoCarga: any = 0;

  
  proxCbte: string;
  mostrarSpinner: boolean = false;
  contador: number = 0;

  constructor( public matDialogRef: MatDialogRef<ConfirmarRemitoComponent>,
               @Inject(MAT_DIALOG_DATA) public data:any,
               private _serviceRemitosConfirmar: ConfirmarRemitoService,
               private _dialog: MatDialog,
               private _router: Router) { }

  ngOnInit(): void {
    this.getfiltros();

    //this.dataSource2 = JSON.parse(localStorage.getItem('Remitir'))._selected;
    this.dataSource2 = this.data.selection._selected;
    console.log(this.dataSource2);
    
    /* this.cantidad = this.dataSource2.length;
    this.picker =  new Date(); */

    //selecciono, por default, todas las filas
    //this.dataSource2.forEach(row => this.selection.select(row));
  }

  getfiltros(){
    this._serviceRemitosConfirmar.getAllDepostitosCarga().subscribe(params => {
      this.filtroDepositosCarga = params.datos;
      this.selectedDepositoCarga = this.filtroDepositosCarga[0].id;
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
      this.selectedTalonario = this.filtroTalonarios[0].nroTalonario;
      this.getUltNroTalonario();;
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

  mostrarError(errStatus, titulo, mensaje){
    
    const matDialogRefDos = this._dialog.open( ModalErrorComponent, { 
      data: {
        titulo: titulo,
        mensaje: mensaje
      } 
    });
    matDialogRefDos.afterClosed()
      .subscribe( () => {
        if (errStatus != 0) {  
          
        } else {
          this._router.navigate(['']);
        }
    });
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

  getUltNroTalonario(){
    
    this.filtroTalonarios.forEach( (talonario: any) => {
      
      console.log(talonario.nroTalonario.toString());
      console.log(this.selectedTalonario);

      if ( talonario.nroTalonario.toString() == this.selectedTalonario ) {
        this.proxCbte = talonario.ultimoId;
        
      } else {
        this.proxCbte = '';
      }
      
    });
  }

  /* seleccion */
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
    this.mostrarSpinner = true;
    this.contador++;
    console.log( "contador", this.contador );
    console.log( this.dataSource2 );

    if (this.contador === 1){

      for (let elemento of this.dataSource2){
        this.toAdd.push(elemento.idDetalle);
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

      
      console.log({body});
      console.log("entró ass");
      this._serviceRemitosConfirmar.generarRemito( body ).subscribe(params => {
        console.log("entró");
        
        setTimeout(() => {    
          this._dialog.closeAll();                      
          this.navegarAlistaRemitos();
          }, 1000);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error");
          this.matDialogRef.close();
        } else {
          let errStatus = err.status
          if (errStatus == 0){
            let titulo = 'Error de Servidor';
            let mensaje = "Por favor comunicarse con Sistemas";
            this.mostrarError(errStatus, titulo, mensaje);
            this.matDialogRef.close();
          } else {
            let titulo = 'Error al crear remito';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
            this.matDialogRef.close();
          }
        }
      });
    }

  }
  
  navegarAlistaRemitos(){
    let ruta = `apps/remitos/lista-remitos`;
    this._router.navigate([ruta]);
  }

}
