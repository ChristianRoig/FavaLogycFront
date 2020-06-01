import {Component, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraService } from './codigos-barra.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionBorrarComponent } from './modal-confirmacion-borrar/modal-confirmacion-borrar.component';

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
    displayedColumns: string[] = ['id', 'codigoDeBarras', 'descripcion', 'editar', 'borrar'];
    dataSource2: any;
    subParametros: Subscription;

    codigoArticulo: string;
    codigoArticuloBusqueda: string;
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
        private changeDetectorRefs: ChangeDetectorRef,
        private _dialog: MatDialog ) {  }

    ngOnInit(): void{

        this.subParametros = this.route.params.subscribe(params => {
            this.codigoArticulo = params['id'];
        })

        this.busqueda = " ";
        this.page = 0;
        this.size = 10;
        this.columna = 'id';
        this.order = 'asc';
        
        this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
        
    }

    editar(id){
        let ruta = `apps/pedidos/codigos-barra/ed/${id}`;
        this._router.navigate([ruta]);
    }

    borrar(id:number){
        this._pedidosCodigosBarraService.deleteCodigoBarra(id)
            .subscribe(
            data => {
              this.page = 0
              this.buscar(this.codigoArticulo, this.busqueda, this.page, this.size, this.columna, this.order);
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                console.log("Server-side error");
              }
              this.volver();
            }
          );
    }

    buscar(codigoArticulo, busqueda, page, size, columna, order){

        if(!busqueda){
          busqueda = ' ';
        }
        
        this._pedidosCodigosBarraService.getCodigosBarra(codigoArticulo, busqueda, page, size, columna, order).subscribe(
            data => {
                this.dataSource2 = data.datos;
                this.length = data.totalRegistros;
                this.nombre = this.dataSource2[0].articulo.nombre;
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                console.log("Server-side error");
                this.volver();
              }
            }
          );            
    }

    search( event ) {

      let search: any = document.getElementById('search');
      this.busqueda = search.value;

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
      let ruta = `apps/pedidos/codigos-barra-add/${this.codigoArticulo}`;
      this._router.navigate([ruta]);
  }

  volver(){
      this._router.navigate(['apps/pedidos/codigos-barra-articulos']);
  }


  confirmacionBorrar( id ) {

    const dialogRef = this._dialog.open( ModalConfirmacionBorrarComponent );

    dialogRef.afterClosed()
      .subscribe(result => {

        if ( result )
          this.borrar( id )

      });
}     
}