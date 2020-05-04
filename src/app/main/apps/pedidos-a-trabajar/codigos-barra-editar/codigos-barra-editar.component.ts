import {Component, ViewEncapsulation, OnInit, HostBinding} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraEditarService } from './codigos-barra-editar.service';
import { Subscription } from 'rxjs';

export interface CodigoBarra {
    id: number,
    articulo: {
        id: number,
        codigoArticulo: string,
        nombre: string,
        descripcion: string,
        observaciones: string,
        sysUsuario: {
            id: number,
            nombre: string,
            descripcion: string,
            usuarioActiveDirectory: string,
            usuarioGAM: string,
            usuarioAltaid: number,
            fechaAlta: number
        },
        fechaAlta: 1587840256000
    },
    codigoDeBarra: string,
    descripcion: string,
    sysUsuario: {
        id: number,
        nombre: string,
        descripcion: string,
        usuarioActiveDirectory: string,
        usuarioGAM: string,
        usuarioAltaid: number,
        fechaAlta: number
    },
    fechaAlta: number
}


const ELEMENT_DATA: CodigoBarra =
    {
        id: 1,
        articulo: {
            id: 1,
            codigoArticulo: "AKANSOP010",
            nombre: "KANEL SOPORTE P/MICROONDAS",
            descripcion: null,
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
            fechaAlta: 1587840256000
        },
        codigoDeBarra: "7798035043002",
        descripcion: null,
        sysUsuario: {
            id: 1,
            nombre: "Santiago Burroni",
            descripcion: "Administrador",
            usuarioActiveDirectory: "",
            usuarioGAM: "",
            usuarioAltaid: 1,
            fechaAlta: 1588086274000
        },
        fechaAlta: 1588086010000
    };

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'codigos-barra-editar',
    templateUrl  : './codigos-barra-editar.component.html',
    styleUrls    : ['./codigos-barra-editar.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosCodigosBarraEditarComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    dataSource2: CodigoBarra;
    subParametros: Subscription;
    id:number;
    codigoDeBarra: string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraEditarService: PedidosCodigosBarraEditarService
    )
    {
        
    }

    

    ngOnInit(): void{
        console.log(this.dataSource.articulo.codigoArticulo);
        this.codigoDeBarra = this.dataSource.codigoDeBarra;
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })

        console.log('this.id');
        console.log(this.id);

        let dataSource2: any = this._pedidosCodigosBarraEditarService.getPartesArticulos();        
    }

    editar(){
        console.log("los cambios fueron guardados");
        let ruta = `apps/pedidos/codigos-barra`;
        console.log(ruta);
        this._router.navigate([ruta]);
    }

    
}