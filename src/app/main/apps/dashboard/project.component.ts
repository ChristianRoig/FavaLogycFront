import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//service
import { ProjectDashboardService } from './project.service';

@Component({
    selector     : 'project-dashboard',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class ProjectDashboardComponent implements OnInit {
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};

    resumen: any = [];
    tipo_resumen = 1;

    length: number = 0;
    mensaje: string;

    dateNow = Date.now();
    fechaHoy = Date();
    fechaString = "aaaa-mm-dd";
    

    estados = [
        { valor: 0, texto:"A remitir" },
        { valor: 1, texto:"En Proceso" },
        { valor: 2, texto:"Despachados" }
    ];

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor (
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private _dialog: MatDialog
    )
    {
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log("entre a project");

        this.getProyectos();
        this.getWidgets();

        /* this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11); */ 
    }
    
    /* convertirFecha(){
        let dia = this.fechaHoy.getDate();
    } */

   /*  setInterval(() => {
        this.dateNow = Date.now();
    }, 1000); */

    getProyectos(){
        this._projectDashboardService.getProjects().subscribe(
            data => {
              console.log("Projects ->", data);
              this.projects = data;
              this.selectedProject = this.projects[0];
            },
            (err: HttpErrorResponse) => {
                console.log("error");
              this.length = 0
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                let errStatus = err.status
                if (errStatus == 0){
                  let titulo = 'Error de Servidor';
                  let mensaje = "Por favor comunicarse con Sistemas";
                  this.mostrarError(errStatus, titulo, mensaje);
                } else {
                  let titulo = 'Error al cargar filtros';
                  let mensaje = err.error.message.toString();
                  this.mensaje = mensaje;
                  // this.mostrarError(errStatus, titulo, mensaje);
                }
              }
            }
        );
    }

    getWidgets(){
        //console.log( "dateNow",this.hoy);
        //this._projectDashboardService.getWidgets().subscribe(
        this._projectDashboardService.getWidgets().subscribe(
            data => {
              console.log("Widgets ->", data);
              this.widgets = data;
              
            },
            (err: HttpErrorResponse) => {
                console.log("error");
              this.length = 0
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                let errStatus = err.status
                if (errStatus == 0){
                  let titulo = 'Error de Servidor';
                  let mensaje = "Por favor comunicarse con Sistemas";
                  this.mostrarError(errStatus, titulo, mensaje);
                } else {
                  let titulo = 'Error al cargar filtros';
                  let mensaje = err.error.message.toString();
                  this.mensaje = mensaje;
                  // this.mostrarError(errStatus, titulo, mensaje);
                }
              }
            }
        );
    }

    mostrarError(errStatus, titulo, mensaje){
        const dialogRef = this._dialog.open( ModalErrorComponent, { 
          data: {
            titulo: titulo,
            mensaje: mensaje
          } 
        });
        dialogRef.afterClosed()
          .subscribe( () => {
              if (errStatus != 0) {
                
              } else {
                //this._router.navigate(['']);
              }
          });
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param _widget11
     */
    constructor(private _widget11)
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._widget11.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}

