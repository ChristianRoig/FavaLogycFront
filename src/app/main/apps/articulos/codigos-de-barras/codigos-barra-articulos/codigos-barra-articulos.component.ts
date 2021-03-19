import {Component, ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Debounce } from 'app/shared/decorators/debounce';

//components
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { PedidosCodigosBarraArticulosService } from './codigos-barra-articulos.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'codigos-barra-articulo',
    templateUrl  : './codigos-barra-articulos.component.html',
    styleUrls    : ['./codigos-barra-articulos.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosCodigosBarraArticulosComponent implements OnInit {

    @ViewChild('buscar') buscarInput: ElementRef;

    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'codigoDeBarras', 'seleccionar'];
    dataSource2: any;
    subParametros: Subscription;
    id:number;
    codigoDeBarra: string;

    busqueda: string;
    length: number;
    page: number;
    size: number;
    columna: string;
    order: string;


    constructor(
        private _router: Router,
        private _pedidosCodigosBarraArticulosService: PedidosCodigosBarraArticulosService,
        private _dialog: MatDialog
    )
    {
        
    }

    ngOnInit(): void{   
        
        this.busqueda = ""
        this.page = 0;
        this.size = 10;
        this.columna = 'id';
        this.order = 'asc';

        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
    }

    irAlArticulo(codigoArticulo){
        let ruta = `apps/articulos/codigos-barra/${codigoArticulo}`;
        this._router.navigate([ruta]);
    }

    buscar(busqueda, page, size, columna, order){

        if(!busqueda){
            busqueda = '';
        }

        this._pedidosCodigosBarraArticulosService.getArticulos(busqueda, page, size, columna, order).subscribe( 
            data => {
              console.log(data);
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
            }
        );
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

                this.busqueda = '';
                this.buscarInput.nativeElement.value = '';

                this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
              } else {
                this._router.navigate(['']);
              }
          });
      }
    
    @Debounce(1000)
    search() {

        this.busqueda = this.buscarInput.nativeElement.value;

        this.page = 0;
        this.columna = 'id';

        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);

    }

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
}