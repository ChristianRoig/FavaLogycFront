import {Component, ViewEncapsulation, OnInit, HostBinding} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosPartesArticulosEditarService } from './partes-articulo-editar.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    selector     : 'partes-articulo-editar',
    templateUrl  : './partes-articulo-editar.component.html',
    styleUrls    : ['./partes-articulo-editar.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosPartesArticuloEditarComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    dataSource2: any;
    subParametros: Subscription;
    id:number;
    cantidad: number;
    codigoArticulo: string;
    nombre: string;
    descripcion: string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosPartesArticulosEditarService: PedidosPartesArticulosEditarService
    )
    {
        
    }

    

    ngOnInit(): void{
        this.cantidad = this.dataSource.cantidad;
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })


        this._pedidosPartesArticulosEditarService.getArticulo(this.id).subscribe( data => {
            this.dataSource2 = data;
            this.cantidad = this.dataSource2.cantidad;
            this.codigoArticulo = this.dataSource2.articulo.codigoArticulo;
            this.nombre = this.dataSource2.articulo.nombre;
            this.descripcion = this.dataSource2.articulo.descripcion;
        });        


        setTimeout(() => {
            
            let cantidad: any = document.getElementById('cantidad-editar');
            cantidad.focus();
        }, 200);
    }

    volver(){
        let ruta = `apps/pedidos/partes-articulo`;
        this._router.navigate([ruta]);
    }

    editar(){

        this._pedidosPartesArticulosEditarService.putArticulo(this.id,this.cantidad).subscribe(
            data => {
              this.volver();
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                console.log("Server-side error");
              }
            }
          );
    }
}