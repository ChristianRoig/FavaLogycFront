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
    displayedColumns: string[] = ['id', 'codigoBarra', 'descripcion', 'editar', 'borrar'];
    dataSource2: any;
    subParametros: Subscription;

    codigoArticulo: string;
    codigoArticuloBusqueda: string;
    nombre: string;

    page: number;
    size: number;
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

        this.page = 0;
        this.size = 10;
        this.order = 'id';
        
        this.buscar(this.codigoArticulo,this.page, this.size, this.order);
        
    }

    editar(id){
        let ruta = `apps/pedidos/codigos-barra/ed/${id}`;
        this._router.navigate([ruta]);
    }

    borrar(id:number){
        this._pedidosCodigosBarraService.deleteCodigoBarra(id)
            .subscribe(
            data => {

                if(this.codigoArticuloBusqueda){
                    this.buscar(this.codigoArticuloBusqueda,this.page, this.size, this.order);
                } else {
                    this.buscar(this.codigoArticulo,this.page, this.size, this.order);
                }
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

    buscar(busqueda, page, size, order){
        
        this._pedidosCodigosBarraService.getCodigosBarra(busqueda, page, size, order).subscribe(
            data => {
                this.dataSource2 = data;
                this.nombre = this.dataSource2[0].articulo.nombre
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

    ordenar(order){
      switch(order) { 
          case 2: { 
             this.order = "codigoDeBarra" ;
             break; 
          }
          case 3: {
             this.order = "descripcion" ;
             break; 
          }
          default: { 
             this.order = "id"
             break; 
          } 
      }

      this.page = 0;
      
      this.buscar(this.codigoArticulo,this.page, this.size, this.order);
  }



  paginar(e: any){
    this.page = e.pageIndex;
    this.size = e.pageSize;
    
    this.buscar(this.codigoArticulo, this.page, this.size, this.order);
  }

  agregar(){
      let ruta = `apps/pedidos/codigos-barra-add/${this.codigoArticulo}/${this.nombre}`;
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