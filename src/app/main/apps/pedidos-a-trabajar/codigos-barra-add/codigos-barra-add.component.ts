import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraAddService } from './codigos-barra-add.service'
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'codigos-barra-add',
    templateUrl  : './codigos-barra-add.component.html',
    styleUrls    : ['./codigos-barra-add.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosCodigosBarraAddComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource2: any;
    subParametros: Subscription;
    id:number;
    cantidad: number;
    codigoArticulo: string;
    nombre: string;
    descripcion: string;
    codigoDeBarra: string;


    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraAddService: PedidosCodigosBarraAddService
    )
    {
        
    }

    

    ngOnInit(): void{
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })


        this._pedidosCodigosBarraAddService.getCodigoBarra(this.id).subscribe( data => {
            this.dataSource2 = data;
            console.log(this.dataSource2);
            // this.cantidad = this.dataSource2.cantidad;
            // this.codigoArticulo = this.dataSource2.articulo.codigoArticulo;
            // this.nombre = this.dataSource2.articulo.nombre;
            // this.descripcion = this.dataSource2.articulo.descripcion;
        });        
    }

    volver(){
        let ruta = `apps/pedidos/partes-articulo`;
        this._router.navigate([ruta]);
    }

    agregar(){

        this._pedidosCodigosBarraAddService.postCodigoBarra(this.id,this.codigoArticulo,this.descripcion)
        // .subscribe(
        //     data => {
        //       this.volver();
        //     },
        //     (err: HttpErrorResponse) => {
        //       if (err.error instanceof Error) {
        //         console.log("Client-side error");
        //       } else {
        //         console.log("Server-side error");
        //       }
        //     }
        //   );
    }
}