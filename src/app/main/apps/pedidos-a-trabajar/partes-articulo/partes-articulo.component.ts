import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { PedidosPartesArticulosService } from './partes-articulo.service';

export interface PeriodicElement {
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


const ELEMENT_DATA: PeriodicElement[] = [
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
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
    dataSource2: PeriodicElement[];

    constructor(
        private _router: Router,
        private _pedidosPartesArticulosService: PedidosPartesArticulosService
    )
    {
        
    }

    ngOnInit(): void{
        let dataSource2: any = this._pedidosPartesArticulosService.getPartesArticulos();
        console.log(dataSource2);
    }

    logout(){
        console.log("ingreso logout");
        this._router.navigate([''])
    }
}

// import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

// import { fuseAnimations } from '@fuse/animations';
// import { FuseUtils } from '@fuse/utils';

// import { takeUntil } from 'rxjs/internal/operators';
// import { PedidosPartesArticulosService } from './partes-articulo.service';

// @Component({
//     selector     : 'pedidos-partes-articulo',
//     templateUrl  : './partes-articulo.component.html',
//     styleUrls    : ['./partes-articulo.component.scss'],
//     animations   : fuseAnimations,
//     encapsulation: ViewEncapsulation.None
// })
// export class PedidosPartesArticuloComponent implements OnInit
// {
//     dataSource: FilesDataSource | null;
//     displayedColumns = ['id', 'codigoArticulo', 'nombre', 'codigoBarra', 'cantidad', ''];

//     @ViewChild(MatPaginator, {static: true})
//     paginator: MatPaginator;

//     @ViewChild(MatSort, {static: true})
//     sort: MatSort;

//     @ViewChild('filter', {static: true})
//     filter: ElementRef;

//     // Private
//     private _unsubscribeAll: Subject<any>;

//     constructor(
//         private _pedidosPartesArticulosService: PedidosPartesArticulosService
//     )
//     {
//         // Set the private defaults
//         this._unsubscribeAll = new Subject();
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Lifecycle hooks
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * On init
//      */
//     ngOnInit(): void
//     {
//         console.log("1");
//         this.dataSource = new FilesDataSource(this._pedidosPartesArticulosService, this.paginator, this.sort);
//         console.log("2");
//         fromEvent(this.filter.nativeElement, 'keyup')
//             .pipe(
//                 takeUntil(this._unsubscribeAll),
//                 debounceTime(150),
//                 distinctUntilChanged()
//             )
//             .subscribe(() => {
//                 console.log("3");
//                 if ( !this.dataSource )
//                 {
//                     console.log("4.1");
//                     return;
//                 }
//                 console.log("4.2");
//                 this.dataSource.filter = this.filter.nativeElement.value;
//             });
//     }
// }

// export class FilesDataSource extends DataSource<any>
// {
//     private _filterChange = new BehaviorSubject('');
//     private _filteredDataChange = new BehaviorSubject('');

//     /**
//      * Constructor
//      *
//      * @param {PedidosPartesArticulosService} _pedidosPartesArticulosService
//      * @param {MatPaginator} _matPaginator
//      * @param {MatSort} _matSort
//      */
//     constructor(
//         private _pedidosPartesArticulosService: PedidosPartesArticulosService,
//         private _matPaginator: MatPaginator,
//         private _matSort: MatSort
//     )
//     {
//         super();

//         this.filteredData = this._pedidosPartesArticulosService.partesArticulo;
//     }

//     /**
//      * Connect function called by the table to retrieve one stream containing the data to render.
//      *
//      * @returns {Observable<any[]>}
//      */
//     connect(): Observable<any[]>
//     {
//         const displayDataChanges = [
//             this._pedidosPartesArticulosService.onPartesArticuloChanged,
//             this._matPaginator.page,
//             this._filterChange,
//             this._matSort.sortChange
//         ];

//         return merge(...displayDataChanges)
//             .pipe(
//                 map(() => {
//                         let data = this._pedidosPartesArticulosService.partesArticulo.slice();

//                         data = this.filterData(data);

//                         this.filteredData = [...data];

//                         data = this.sortData(data);

//                         // Grab the page's slice of data.
//                         const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
//                         return data.splice(startIndex, this._matPaginator.pageSize);
//                     }
//                 ));
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Accessors
//     // -----------------------------------------------------------------------------------------------------

//     // Filtered data
//     get filteredData(): any
//     {
//         return this._filteredDataChange.value;
//     }

//     set filteredData(value: any)
//     {
//         this._filteredDataChange.next(value);
//     }

//     // Filter
//     get filter(): string
//     {
//         return this._filterChange.value;
//     }

//     set filter(filter: string)
//     {
//         this._filterChange.next(filter);
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Filter data
//      *
//      * @param data
//      * @returns {any}
//      */
//     filterData(data): any
//     {
//         if ( !this.filter )
//         {
//             return data;
//         }
//         return FuseUtils.filterArrayByString(data, this.filter);
//     }

//     /**
//      * Sort data
//      *
//      * @param data
//      * @returns {any[]}
//      */
//     sortData(data): any[]
//     {
//         if ( !this._matSort.active || this._matSort.direction === '' )
//         {
//             return data;
//         }

//         return data.sort((a, b) => {
//             let propertyA: number | string = '';
//             let propertyB: number | string = '';

//             switch ( this._matSort.active )
//             {
//                 case 'id':
//                     [propertyA, propertyB] = [a.id, b.id];
//                     break;
//                 case 'name':
//                     [propertyA, propertyB] = [a.name, b.name];
//                     break;
//                 case 'categories':
//                     [propertyA, propertyB] = [a.categories[0], b.categories[0]];
//                     break;
//                 case 'price':
//                     [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
//                     break;
//                 case 'quantity':
//                     [propertyA, propertyB] = [a.quantity, b.quantity];
//                     break;
//                 case 'active':
//                     [propertyA, propertyB] = [a.active, b.active];
//                     break;
//             }

//             const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//             const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//             return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
//         });
//     }

//     /**
//      * Disconnect
//      */
//     disconnect(): void
//     {
//     }
// }
