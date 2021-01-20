import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog,   } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { Debounce } from 'app/shared/decorators/debounce';

// componentes
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { ModalDeseaImprimirLoteComponent } from './modal-confirmacion-borrar/modal-desea-imprimir.component';
import { VerImpresorasComponent } from '../../../lotes/lista-lotes/ver-impresoras/ver-impresoras.component';

//servicios
import { UsuarioService } from 'app/services/usuario.service';
import { ListaLotesService } from '../../lista-lotes/lista-lotes.service';
import { LoteAgregarLoteService } from './agregar-lote.service';

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
  templateUrl: './agregar-lote.component.html',
  styleUrls: ['./agregar-lote.component.scss']
})

export class LoteAgregarLoteComponent implements OnInit {

  @ViewChild('buscarNombreLote') buscarNombreLote: ElementRef;


  subParametros: Subscription;
  
  displayedColumnsArticulos: string[] = ['id', 'codigoArticulo', 'nombre', 'cantidad', 'etapa'];
  //displayedColumnsArticulos: string[] = ['select', 'Tipo', 'CodigoArticulo','NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'Provincia', 'Localidad','Etapa'];
  
  //['select', 'Tipo', 'CodigoArticulo','NombreArticulo', 'Comprobante', 'Fecha-Entrega', 'Provincia', 'Localidad','Etapa'];


  dataSourceArticulos: any;
  cantidad: number;
  idCabecera: any;
  picker: Date;
  selection = new SelectionModel<any>(true, []);
  toAdd = new Array<number>();

  nombreLote: string;

  constructor(private _router: Router,
              private _service: LoteAgregarLoteService,
              private _listaLoteService: ListaLotesService,
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

    for (let elemento of this.dataSourceArticulos){
      this.toAdd.push(elemento.id);
    }
    console.log("this.toAdd");
    console.log(this.toAdd);
    
    this._service.postLote(this.toAdd, this.nombreLote).subscribe(
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


  imprimirCupa(idLote){

    let application_name = "Favalogyc";
    let permission_name = "Impresion_CUPA"

    // let res = await this._usuarioService.checkPermision(application_name, permission_name);

    // if (res === false){
    //   this.mostrarError(1, 'Error de Permisos', `Usted no tiene permisos para realizar la acción: ${permission_name}.`);
    // } else {
    if(localStorage.getItem('ImpresoraCUPA')){
      this.imprimir(idLote);
    } else {
      this.seleccionarImpresora(idLote)
    } 
    // }
  }
 

   imprimir(idLote){
    let impresora = localStorage.getItem('ImpresoraCUPA');

    this._listaLoteService.imprimir(idLote,impresora).subscribe(data => {
      
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
    let ruta = `apps/lotes/crear-lote`;
    this._router.navigate([ruta]);
  }

}
