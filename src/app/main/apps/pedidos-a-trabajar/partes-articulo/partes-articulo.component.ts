import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PedidosPartesArticulosService } from './partes-articulo.service';

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


const ELEMENT_DATA: ParteArticulo[] = [
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
    },
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
    },
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
    },
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
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'pedidos-partes-articulo',
    templateUrl  : './partes-articulo.component.html',
    styleUrls    : ['./partes-articulo.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PedidosPartesArticuloComponent implements OnInit {
    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'cantidad', 'editar'];
    dataSource = ELEMENT_DATA;
    dataSource2: ParteArticulo[];

    constructor(
        private _router: Router,
        private _pedidosPartesArticulosService: PedidosPartesArticulosService
    )
    {
        
    }

    ngOnInit(): void{
        // let dataSource2: any = this._pedidosPartesArticulosService.getPartesArticulos();
        console.log("datasourse");
        // console.log(dataSource2);
        
    }

    editar(id){
        console.log(id);
        let ruta = `apps/pedidos/partes-articulo/${id}`;
        console.log(ruta);
        this._router.navigate([ruta]);
    }

    logout(){
        console.log("ingreso logout");
        this._router.navigate([''])
    }
}