import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { LoginService } from '../../auth/login/login.service';


//service
import { TableroService } from './tablero.service';

@Component({
    selector     : 'app-tablero',
    templateUrl  : './tablero.component.html',
    styleUrls    : ['./tablero.component.scss'],
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
    numEstado: number = 0;

    length: number = 0;
    mensaje: string;
    valorFijo: string = "En Proceso";

    dateNow = Date.now();
    user: string;
    nombreUsuario: string = "Pablo";
    

    estados = [
        { valor: 0, texto:"A Programar" },
        { valor: 1, texto:"En Proceso" },
        { valor: 2, texto:"Despachados" }
    ];

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TableroService} _tableroService
     */
    constructor (
        private _fuseSidebarService: FuseSidebarService,
        private _tableroService: TableroService,
        private _dialog: MatDialog,
        private _loginService: LoginService
    )
    { }


    /**
     * On init
     */
    ngOnInit(): void {

        this.getResumen();
        /* this.widget11.onContactsChanged = new BehaviorSubject({});
        this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        this.widget11.dataSource = new FilesDataSource(this.widget11); */ 
        this.user = localStorage.getItem("username");
    }

    setValor(num){
        console.log(num);
        this.numEstado = num;
    }

    getResumen(){

        this._tableroService.getResumen().subscribe(
            data => {
              console.log("resumen ->", data.resumen);
              this.resumen = data.resumen; 
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

