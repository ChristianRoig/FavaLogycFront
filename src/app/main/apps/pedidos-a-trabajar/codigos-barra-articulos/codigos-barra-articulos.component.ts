import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraArticulosService } from './codigos-barra-articulos.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

export interface Articulos {
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
        fechaAlta: number
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


const ELEMENT_DATA: Articulos[] = [
    {
        id: 1288,
        articulo: {
            id: 1290,
            codigoArticulo: "MPLAPLA010",
            nombre: "PLATINUM PLAC.2 PTAS912 CED A1",
            descripcion: "1.85*0.48*0.62",
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
        codigoDeBarra: "7794904912059",
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
        id: 1289,
        articulo: {
            id: 1291,
            codigoArticulo: "MPLAPLA020",
            nombre: "PLATINUM PLAC.3PTAS.913 CED A2",
            descripcion:" 1.85*0.48*0.92",
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
        codigoDeBarra: "7794904913056",
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
        id: 1290,
        articulo: {
            id: 1292,
            codigoArticulo: "MPLAPLA030",
            nombre: "PLATINUM PLAC.4PTAS.914 CED A2",
            descripcion: "1.85*0.48*1.22",
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
        codigoDeBarra: "7794904914053",
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
        id: 1291,
        articulo: {
            id: 1293,
            codigoArticulo: "MPLAPLA040",
            nombre: "PLATINUM PLAC.6PTAS.916 CED A3",
            descripcion: "1.85*1.82*0.48",
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
        codigoDeBarra: "7794904916057",
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
        id: 1456,
        articulo: {
            id: 1460,
            codigoArticulo: "MPLAPLA015",
            nombre: "PLATINU PLAC.2 PTAS.912 ROB A1",
            descripcion: "1.85*0.48*0.62",
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
            fechaAlta: 1588084917000
        },
        codigoDeBarra: "7794904912066",
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
        id: 1457,
        articulo: {
            id: 1461,
            codigoArticulo: "MPLAPLA035",
            nombre: "PLATINUM PLAC.4PTAS.914 ROB A2",
            descripcion: "1.85*1.22*0.48",
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
            fechaAlta: 1588084917000
        },
        codigoDeBarra: "7794904914060",
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
        id: 1458,
        articulo: {
            id: 1462,
            codigoArticulo: "MPLAPLA045",
            nombre: "PLATINUM PLAC.6PTAS.916 ROB A3",
            descripcion: "1.85*1.82*0.48",
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
            fechaAlta: 1588084917000
        },
        codigoDeBarra: "7794904916064",
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
        id: 1486,
        articulo: {
            id: 1490,
            codigoArticulo: "MPLAPLA160",
            nombre: "PLATIN.PLAC.4PTS.TABA 1004 A2",
            descripcion: "2.00*1.22*0.48",
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
            fechaAlta: 1588084918000
        },
        codigoDeBarra: "7794904989976",
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
        id: 1487,
        articulo: {
            id: 1491,
            codigoArticulo: "MPLAPLA165",
            nombre: "PLATIN.PLAC. 6PTS.TABA 1006 A3",
            descripcion: "2.00*1.82*0.48",
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
            fechaAlta: 1588084918000
        },
        codigoDeBarra: "7794904989945",
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
        id: 1546,
        articulo: {
            id: 1553,
            codigoArticulo: "MPLAPLA037",
            nombre: "PLATINUM PLA.4PTAS.914 TAB A2",
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
            fechaAlta: 1588084918000
        },
        codigoDeBarra: "7794904914084",
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
    templateUrl  : './codigos-barra-articulos.component.html',
    styleUrls    : ['./codigos-barra-articulos.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosCodigosBarraArticulosComponent implements OnInit {
    displayedColumns: string[] = ['id', 'codigoArticulo', 'nombre', 'descripcion', 'codigoDeBarra', 'seleccionar'];
    dataSource = ELEMENT_DATA;
    dataSource2: any;
    subParametros: Subscription;
    id:number;
    codigoDeBarra: string;

    page: number;
    size: number;
    order: string;


    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraArticulosService: PedidosCodigosBarraArticulosService
    )
    {
        
    }

    ngOnInit(): void{
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })        
        
        this.page = 0;
        this.size = 10;
        this.order = 'id';

        this.buscar(this.page, this.size, this.order);
    }

    irAlArticulo(codigoArticulo){
        let ruta = `apps/pedidos/codigos-barra/${codigoArticulo}`;
        this._router.navigate([ruta]);
    }

    buscar(page, size, order){
        this._pedidosCodigosBarraArticulosService.getArticulos(page, size, order).subscribe( data => {
            this.dataSource2 = data;
        });
    }

    ordenar(order){
        switch(order) { 
            case 2: { 
               this.order = "codigoArticulo" ;
               break; 
            }
            case 3: { 
               this.order = "nombre" ;
               break; 
            }
            case 4: { 
               this.order = "descripcion" ;
               break; 
            }
            case 5: { 
               this.order = "codigoDeBarra" ;
               break; 
            }
            default: { 
               this.order = "id"
               break; 
            } 
        }

        this.page = 0;
        
        this.buscar(this.page, this.size, this.order);

    }

    paginar(e: any){
        this.page = e.pageIndex;
        this.size = e.pageSize;
        
        this.buscar(this.page, this.size, this.order);
    }

    logout(){
        this._router.navigate([''])
    }
}