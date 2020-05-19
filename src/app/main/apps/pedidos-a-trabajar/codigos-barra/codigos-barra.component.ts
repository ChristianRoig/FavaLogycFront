import {Component, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraService } from './codigos-barra.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraService: PedidosCodigosBarraService,
        private changeDetectorRefs: ChangeDetectorRef
    )
    {
        
    }

    ngOnInit(): void{

        this.subParametros = this.route.params.subscribe(params => {
            this.codigoArticulo = params['id'];
        })
        
        this.buscar(this.codigoArticulo);
        
    }

    editar(id){
        let ruta = `apps/pedidos/codigos-barra/ed/${id}`;
        this._router.navigate([ruta]);
    }

    borrar(id:number){
        this._pedidosCodigosBarraService.deleteCodigoBarra(id)
            .subscribe(
            data => {
                console.log(this.codigoArticuloBusqueda)
                console.log(this.codigoArticulo)

                if(this.codigoArticuloBusqueda){
                    this.buscar(this.codigoArticuloBusqueda);
                } else {
                    this.buscar(this.codigoArticulo);
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

    buscar(busqueda){
        
        this._pedidosCodigosBarraService.getCodigosBarra(busqueda).subscribe(
            data => {
                this.dataSource2 = data;
                this.nombre = this.dataSource2[0].articulo.nombre
                console.log(this.dataSource2);
                // this.changeDetectorRefs.detectChanges();
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

    agregar(){
        let ruta = `apps/pedidos/codigos-barra-add/${this.codigoArticulo}/${this.nombre}`;
        this._router.navigate([ruta]);
    }

    volver(){
        this._router.navigate(['apps/pedidos/codigos-barra-articulos']);
    }
}