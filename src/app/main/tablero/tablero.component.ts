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
import { AuthStorageService } from '../../auth/login/auth-storage.service';

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
    numEstado: number;

    length: number = 0;
    mensaje: string;
    valorEnProceso: number;

    estoyEnSUC: boolean = false;

    dateNow = Date.now();
    user: string;
    nombreUsuario: string = "Pablo";
    sucursal: string = "CASA CENTRAL";
    
    userSuc: boolean;
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
    constructor ( private _fuseSidebarService: FuseSidebarService,
      private _tableroService: TableroService,
      private _dialog: MatDialog,
      private _authStorage: AuthStorageService ) { }
      
      /**
       * On init
       */
      ngOnInit(): void {
        
        this.estoyEnSUCFunction();
        this.getResumen();
        this.user = localStorage.getItem("user");
        this.sucursal = localStorage.getItem("nbSuc");
      }
      
      setValor(num){
        console.log(num);
        this.numEstado = num;
      }
      
      seleccionarProyecto(): void{
      }
      
      estoyEnSUCFunction (): any {
        console.log("entroooo");
        const user = this._authStorage.getUser();
        if ( user === "luque.gonzalo" ) {
          this.userSuc = true;
          this.valorEnProceso = this.estados[0].valor;
          this.numEstado = 0;
          console.log( this.userSuc );
        } else {
          this.numEstado = 1;
          this.valorEnProceso = this.estados[1].valor;
          return false;
        }
      }
      
      getResumen(){
        const token = this._authStorage.getToken();

        this._tableroService.getResumen( token ).subscribe(
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
    toggleSidebar(name): void {
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

