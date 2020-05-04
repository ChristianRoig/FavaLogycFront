import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraAddService } from './codigos-barra-add.service'
import { Subscription } from 'rxjs';

export interface ParteArticulo {
        id: number;
        articulo: {
            id: number;
            codigoArticulo: string;
            nombre: string;
            descripcion: string;
            observaciones: string;
            sysUsuario: {
                id: 1;
                nombre: string;
                descripcion: string;
                usuarioActiveDirectory:string;
                usuarioGAM: string;
                usuarioAltaid: number;
                fechaAlta: number;
            },
            fechaAlta: number;
        };
        cantidad: number;
        sysUsuario: {
            id: 1;
            nombre: string;
            descripcion: string;
            usuarioActiveDirectory:string;
            usuarioGAM: string;
            usuarioAltaid: number;
            fechaAlta: number;
        };
        fechaAlta: number;
    }


const ELEMENT_DATA: ParteArticulo = 
    {
        id: 1284,
        articulo: {
            id: 1284,
            codigoArticulo: "MPLAMOD040",
            nombre: "PLATINUM.MODULAR 553 CED A2",
            descripcion: "1.82*1.52*0.45",
            observaciones: null,
            sysUsuario: {
                id: 1,
                nombre: "Santiago Burroni",
                descripcion: "Administrador",
                usuarioActiveDirectory: "",
                usuarioGAM: "",
                usuarioAltaid: 1,
                fechaAlta: 1588086274000
            },
            fechaAlta: 1588084916000
        },
        cantidad: 7,
        sysUsuario: {
            id: 1,
            nombre: "Santiago Burroni",
            descripcion: "Administrador",
            usuarioActiveDirectory: "",
            usuarioGAM: "",
            usuarioAltaid: 1,
            fechaAlta: 1588086274000
        },
        fechaAlta: 1588086284000
    }
;

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
    dataSource = ELEMENT_DATA;
    dataSource2: ParteArticulo[];
    subParametros: Subscription;
    id:number;
    cantidad: number;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraAddService: PedidosCodigosBarraAddService
    )
    {
        
    }

    

    ngOnInit(): void{
        console.log(this.dataSource.articulo.codigoArticulo);
        this.cantidad = this.dataSource.cantidad;
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })

        console.log('this.id');
        console.log(this.id);

        let dataSource2: any = this._pedidosCodigosBarraAddService.getPartesArticulos();        
    }

    editar(){
        console.log("los cambios fueron guardados");
        let ruta = `apps/pedidos/partes-articulo`;
        console.log(ruta);
        this._router.navigate([ruta]);
    }
}