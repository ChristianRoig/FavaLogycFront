import {Component, ViewEncapsulation, OnInit, ChangeDetectorRef, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Debounce } from 'app/shared/decorators/debounce';
import { fuseAnimations } from '@fuse/animations';

//componentes
import { ModalConfirmacionBorrarComponent } from './modal-confirmacion-borrar/modal-confirmacion-borrar.component';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { PedidosCodigosBarraService } from './codigos-barra.service';
import { ImprimirCodBarraComponent } from './imprimir-cod-barra/imprimir-cod-barra.component';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'codigos-barra-articulo',
    templateUrl  : './codigos-barra.component.html',
    styleUrls    : ['./codigos-barra.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PedidosCodigosBarraComponent implements OnInit {

    @ViewChild('buscar') buscarInput: ElementRef;
    
    displayedColumns: string[] = ['id', 'codigoDeBarras', 'descripcion', 'editar', 'borrar', 'imprimir'];
    dataSource2: any;
    subParametros: Subscription;

    idArticulo: number;
    codigoArticulo: string;
    nombre: string;

    busqueda: string;
    length: number;
    page: number;
    size: number;
    columna: string;
    order: string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraService: PedidosCodigosBarraService,
        private _dialog: MatDialog ) {  }

    ngOnInit(): void{

        this.subParametros = this.route.params.subscribe(params => {
            this.codigoArticulo = params['id'];
        })

        this.busqueda = "";
        this.page = 0;
        this.size = 10;
        this.columna = 'id';
        this.order = 'asc';
        
        this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
        
    }

    editar(id){
        let ruta = `articulos/codigos-barra/${this.codigoArticulo}/${id}`;
        this._router.navigate([ruta]);
    }

    borrar(id:number){
        this._pedidosCodigosBarraService.deleteCodigoBarra(id)
            .subscribe(
            data => {
              this.page = 0

              let titulo = 'Confirmación de Borrado';
              let mensaje = "Se borró el registro correctamente";
              this.mostrarError(200, titulo, mensaje);
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
                  let titulo = 'Error al eliminar';
                  let mensaje = err.error.message.toString();
                  this.mostrarError(errStatus, titulo, mensaje);
                }
              }
            }
          );
    }

    buscar(codigoArticulo, busqueda, page, size, columna, order){

        if(!busqueda){
          busqueda = '';
        }
        
        this._pedidosCodigosBarraService.getCodigosBarra(codigoArticulo, busqueda, page, size, columna, order).subscribe(
            data => {
                this.dataSource2 = data.datos;
                this.idArticulo = this.dataSource2[0].id;
                this.length = data.totalRegistros;
                this.nombre = this.dataSource2[0].articulo.nombre;
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
            }
          );            
    }

  
  search() {

    this.busqueda = this.buscarInput.nativeElement.value;

    this.page = 0;
    this.columna = 'id';

    this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);

  }

  sortData( event ) {
        
      this.page = 0;
      this.columna = event.active;
      
      if (event.direction !== "")
          this.order = event.direction;
      
      this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
  }



  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
  }

  agregar(){
      let ruta = `articulos/codigos-barra-add/${this.codigoArticulo}`;
      this._router.navigate([ruta]);
    }
    
    volver(){
    let ruta = `articulos/codigos-barra-articulos`;
      this._router.navigate([ruta]);
  }

  

  confirmacionBorrar( id, codigoDeBarras, descripcion ) {

    const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent, { 
      data: {
        id: id, 
        codigoArticulo: this.codigoArticulo,
        codigoDeBarras: codigoDeBarras, 
        descripcion: descripcion
      } 
    });

    dialogRef.afterClosed()
      .subscribe(result => {

        if ( result )
          this.borrar( id )

      });
  }

  imprimir( idArticulo: number ){
    const dialogRef = this._dialog.open( ImprimirCodBarraComponent, { 
      data: {
        idArticulo: this.idArticulo,
        codigoArticulo: this.codigoArticulo
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

            this.busqueda = '';
            this.buscarInput.nativeElement.value = '';

            this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
          } else {
            this._router.navigate(['']);
          }

      });
  }
}