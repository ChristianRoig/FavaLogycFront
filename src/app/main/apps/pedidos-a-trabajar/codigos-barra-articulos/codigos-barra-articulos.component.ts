import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraArticulosService } from './codigos-barra-articulos.service';
import { Subscription } from 'rxjs';


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
    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'descripcion', 'codigoDeBarras', 'seleccionar'];
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
        private _pedidosCodigosBarraArticulosService: PedidosCodigosBarraArticulosService
    )
    {
        
    }

    ngOnInit(): void{   
        
        this.busqueda = " "
        this.page = 0;
        this.size = 10;
        this.columna = 'id';
        this.order = 'asc';

        this.buscar(this.busqueda, this.page, this.size, this.columna, this.order);
    }

    irAlArticulo(codigoArticulo){
        let ruta = `apps/pedidos/codigos-barra/${codigoArticulo}`;
        this._router.navigate([ruta]);
    }

    buscar(busqueda, page, size, columna, order){

        if(!busqueda){
            busqueda = ' ';
        }

        this._pedidosCodigosBarraArticulosService.getArticulos(busqueda, page, size, columna, order).subscribe( data => {
            this.dataSource2 = data.datos;
            this.length = data.totalRegistros;
        });
    }

    
    search( event ) {

        let search: any = document.getElementById('search');
        this.busqueda = search.value;

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

    logout(){
        this._router.navigate([''])
    }
}