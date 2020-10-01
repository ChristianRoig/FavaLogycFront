import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidosAgregarLoteService } from './pedidos-agregar-lote.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';
import { ModalDeseaImprimirLoteComponent } from './modal-confirmacion-borrar/modal-desea-imprimir.component';
import { LoteAdministrarLoteService } from '../lote-administrar-lote/lote-administrar-lote.service';
import { VerImpresorasComponent } from '../lote-administrar-lote/ver-impresoras/ver-impresoras.component';
import { UsuarioService } from 'app/services/usuario.service';


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

@Component({
  selector: 'app-pedidos-agregar-lote',
  templateUrl: './pedidos-agregar-lote.component.html',
  styleUrls: ['./pedidos-agregar-lote.component.scss']
})

export class PedidosAgregarLoteComponent implements OnInit {

  @ViewChild('buscarNombreLote') buscarNombreLote: ElementRef;


  subParametros: Subscription;
  
  displayedColumnsArticulos: string[] = ['select','id','codigoArticulo','nombre','cantidad','estado','etapa'];


  dataSourceArticulos: any;
  cantidad: number;
  idCabecera: any;
  picker: Date;
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array<number>();

  nombreLote: string;

  constructor(private _router: Router,
              private _service: PedidosAgregarLoteService,
              private _loteAdministrarLoteService: LoteAdministrarLoteService,
              private _usuarioService: UsuarioService,
              private route: ActivatedRoute,
              private _dialog: MatDialog) { }

  ngOnInit(): void {

    this.subParametros = this.route.params.subscribe(params => {
      this.idCabecera = params['id'];
    })

    this.dataSourceArticulos = JSON.parse(localStorage.getItem('Lote'))._selected;

    this.cantidad = this.dataSourceArticulos.length;

    this.picker =  new Date();
    
    console.log(this.dataSourceArticulos);    
    console.log(this.cantidad);    
    
  }
  
  searchNombreLote() {

    this.nombreLote = this.buscarNombreLote.nativeElement.value;

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
          this.volver(); 
        } else {
          this._router.navigate(['']);
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  crearLote(){
    console.log("crearLote");

    localStorage.removeItem("Lote");
    console.log(this.selection);
    this.armarArrarIds();
  }

  armarArrarIds(){
    this.picker.getFullYear()
    let fecha = this.picker.getFullYear()+"-"+(this.picker.getMonth()+1)+"-"+this.picker.getDate();

    
    for (let elemento of this.selection.selected){
      this.toAdd.push(elemento.id);
    }
    
    this._service.postLote(this.toAdd , fecha, this.nombreLote).subscribe(
      data => {
        let idLote = data.idLote
        this.imprimirCupas(idLote);
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
            let titulo = 'Error al Agregar';
            let mensaje = err.error.message.toString();
            this.mostrarError(errStatus, titulo, mensaje);
          }
        }
      }
    )
  }

  imprimirCupas(idLote: number){
    const dialogRef = this._dialog.open( ModalDeseaImprimirLoteComponent, {
      data: {
        idLote: idLote
      }
    });

    dialogRef.beforeClosed()
      .subscribe(result => {

        if ( result ){
          this.imprimirCupa(idLote);
        } 
        this.volver();  
        
      });


      
  }


  async imprimirCupa(idLote){

    let application_name = "Favalogyc";
    let permission_name = "Impresion_CUPA"

    let res = await this._usuarioService.checkPermision(application_name, permission_name);

    if (res === false){
      this.mostrarError(1, 'Error de Permisos', `Usted no tiene permisos para realizar la acción: ${permission_name}.`);
    } else {
      if(localStorage.getItem('ImpresoraCUPA')){
        this.imprimir(idLote);
      } else {
        this.seleccionarImpresora(idLote)
      }
    }
  }


  imprimir(idLote){
    let impresora = localStorage.getItem('ImpresoraCUPA');

    this._loteAdministrarLoteService.imprimir(idLote,impresora).subscribe(data => {
      
      let titulo = 'Estado de impresión';
      let mensaje = "Completado correctamente";
      this.mostrarError(-1, titulo, mensaje);
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
          let titulo = 'Error al imprimir';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });

  }

  seleccionarImpresora(idLote){
    let dialogRef = this._dialog.open(VerImpresorasComponent, {
      data: {
        pedidos: this.selection,
        impresora: 'ImpresoraCUPA'
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if(localStorage.getItem('ImpresoraCUPA')){
          this.imprimir(idLote);
        } else {
          dialogRef.close();
          this.seleccionarImpresora(idLote);
        }
      });
  }




  volver(){
    let ruta = `apps/pedidos/administracion/crear-lote`;
    this._router.navigate([ruta]);
  }

}
