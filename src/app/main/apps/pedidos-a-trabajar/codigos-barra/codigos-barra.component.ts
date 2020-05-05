import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PedidosCodigosBarraService } from './codigos-barra.service';

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


const ELEMENT_DATA: CodigoBarra[] = [
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
    },
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
    },
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
    }
];

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
    dataSource = ELEMENT_DATA;
    dataSource2: CodigoBarra[];

    constructor(
        private _router: Router,
        private _pedidosCodigosBarraService: PedidosCodigosBarraService
    )
    {
        
    }

    ngOnInit(): void{
        // let dataSource2: any = this._pedidosCodigosBarraService.getPartesArticulos();
        console.log("datasourse");
        // console.log(dataSource2);
        
    }

    editar(id){
        console.log(id);
        let ruta = `apps/pedidos/codigos-barra/ed/${id}`;
        console.log(ruta);
        this._router.navigate([ruta]);
    }

    borrar(id){

    }

    logout(){
        console.log("ingreso logout");
        this._router.navigate([''])
    }
}