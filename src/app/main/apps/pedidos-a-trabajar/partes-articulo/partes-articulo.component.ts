import {Component, ViewEncapsulation, OnInit, ViewChild, Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PedidosPartesArticulosService } from './partes-articulo.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

@Component({
    selector     : 'pedidos-partes-articulo',
    templateUrl  : './partes-articulo.component.html',
    styleUrls    : ['./partes-articulo.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PedidosPartesArticuloComponent implements OnInit {

    @ViewChild('filter', { static: false}) input: Input;

    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'cantidad', 'editar'];
    dataSource2: any;

    busqueda: string;
    length: number;
    page: number;
    size: number;
    columna: string;
    order: string;

    constructor(
        private _router: Router,
        private _pedidosPartesArticulosService: PedidosPartesArticulosService,
        private _dialog: MatDialog ) { }

    ngOnInit(): void{
        this.busqueda = " "
        this.page = 0;
        this.size = 10;
        this.columna = 'id';
        this.order = 'asc';

        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
    }

    buscar(busqueda, page, size, columna, order){

        if(!busqueda){
            busqueda = ' ';
        }

        this._pedidosPartesArticulosService.getPartesArticulos(busqueda, page, size, columna, order).subscribe(data => {
            this.dataSource2 = data.datos;
            this.length = data.totalRegistros;
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
          .subscribe(result => {
              if (errStatus != 0) {            
                this.busqueda = ' ';
                let search: any = document.getElementById('search');
                search.value = '';
                this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
              } else {
                this._router.navigate(['']);
              }
          });
      }


    search( event ) {

        let search: any = document.getElementById('search');
        this.busqueda = search.value;

        this.page = 0;
        this.columna = 'id';

        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);

    }

    /**
     * Ordena la tabla por la columna que viene en *event.active*
     * @param event
     */
    sortData( event ) {
        
        this.page = 0;
        this.columna = event.active;
        
        if (event.direction !== "")
            this.order = event.direction;
        
        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
    }


    paginar(e: any){
        this.page = e.pageIndex;
        this.size = e.pageSize;
        
        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
    }

    editar(id){
        let ruta = `apps/pedidos/partes-articulo/${id}`;
        this._router.navigate([ruta]);
    }
}