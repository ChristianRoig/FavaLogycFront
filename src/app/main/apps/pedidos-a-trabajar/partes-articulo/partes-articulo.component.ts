import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PedidosPartesArticulosService } from './partes-articulo.service';

@Component({
    selector     : 'pedidos-partes-articulo',
    templateUrl  : './partes-articulo.component.html',
    styleUrls    : ['./partes-articulo.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PedidosPartesArticuloComponent implements OnInit {
    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'cantidad', 'editar'];
    dataSource2: any;

    page: number;
    size: number;
    order: string;

    constructor(
        private _router: Router,
        private _pedidosPartesArticulosService: PedidosPartesArticulosService ) { }

    ngOnInit(): void{
        this.page = 0;
        this.size = 10;
        this.order = 'id';

        this.buscar(this.page, this.size, this.order);
        
    }

    buscar(page, size, order){
        this._pedidosPartesArticulosService.getPartesArticulos(page, size, order).subscribe(data => {
            this.dataSource2 = data;
        });
    }

    
    /**
     * Ordena la tabla por la columna que viene en *event.active*
     * @param event
     */
    sortData( event ) {
        
        this.page = 0;
        
        this.buscar(this.page, this.size, event.active);        
    }


    paginar(e: any){
        this.page = e.pageIndex;
        this.size = e.pageSize;
        
        this.buscar(this.page, this.size, this.order);
    }

    editar(id){
        let ruta = `apps/pedidos/partes-articulo/${id}`;
        this._router.navigate([ruta]);
    }
}