import {Component, ViewEncapsulation, OnInit, HostBinding} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';

//services
import { PedidosPartesArticulosEditarService } from './partes-articulo-editar.service';

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

    displayedColumns  : string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource2       : any;
    subParametros     : Subscription;
    id                : number;
    cantidad          : number;
    codigoArticulo    : string;
    nombre            : string;
    descripcion       : string;
    observaciones     : string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosPartesArticulosEditarService: PedidosPartesArticulosEditarService,
        private _dialog: MatDialog
    )
    {
        
    }

    

    ngOnInit(): void{
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
        })


        this._pedidosPartesArticulosEditarService.getArticulo(this.id).subscribe( 
            data => {
              console.log(data);
                this.dataSource2 = data;
                this.cantidad = this.dataSource2.partes;
                this.codigoArticulo = this.dataSource2.codigoArticulo;
                this.nombre = this.dataSource2.nombre;
                this.descripcion = this.dataSource2.descripcion;
                this.observaciones = this.dataSource2.observaciones;
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error");
                } else {
                    let errStatus = err.status
                    if (errStatus == 0){
                        let titulo = 'Error de Servidor';
                        let mensaje = "Por favor comunicarse con Sistemas";
                        this.mostrarError(errStatus, titulo, mensaje);
                    } else {
                        let titulo = 'Parte de articulo no encontrada';
                        let mensaje = err.error.message.toString();
                        this.mostrarError(errStatus, titulo, mensaje);
                    }
                }
            }
        );        


        setTimeout(() => {
            
            let cantidad: any = document.getElementById('cantidad-editar');
            cantidad.focus();
        }, 200);
    }

    volver(){
        let ruta = `apps/articulos/partes-articulo`;
        this._router.navigate([ruta]);
    }

    editar(){
      /* this.cantidad = this.dataSource2.partes;
          this.codigoArticulo = this.dataSource2.codigoArticulo;
          this.nombre = this.dataSource2.nombre;
          this.descripcion = this.dataSource2.descripcion; */
      if ( this.observaciones == null){
        this.observaciones = "";
      }
      if ( this.descripcion == null){
        this.descripcion = "";
      }

      if(this.cantidad < 1){
        let titulo = 'Error al Editar';
        let mensaje = "La cantidad debe ser mayor a 1";
        this.mostrarError(0, titulo, mensaje);
      } else {

        const body = {

          "id"            : this.id,
          "nombre"        : this.nombre,
          "descripcion"   : this.descripcion,
          "observaciones" : this.observaciones,
          "partes"        : this.cantidad

        }

        this._pedidosPartesArticulosEditarService.putArticulo( this.id, body ).subscribe(
          data => {
            let titulo = 'Confirmación de Edición';
            let mensaje = "Se actualizó el registro correctamente";
            this.mostrarError(200, titulo, mensaje);
          },
          (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error");
              } else {
                let errStatus = err.status
                if (errStatus == 0){
                  let titulo = 'Error de Servidor';
                  let mensaje = "Por favor comunicarse con Sistemas";
                  this.mostrarError(errStatus, titulo, mensaje);
                } else {
                  let titulo = 'Error al Editar';
                  let mensaje = err.error.message.toString();
                  this.mostrarError(errStatus, titulo, mensaje);
                }
              }
            }
        );
      }
    }

    mostrarError(errStatus, titulo, mensaje){
        const dialogRef = this._dialog.open( ModalErrorComponent, { 
          data: {
            titulo: titulo,
            mensaje: mensaje
          } 
        });
    
        dialogRef.afterClosed()
          .subscribe(result => {
              if (errStatus > 0) {            
                this.volver();
              } else {
                if (errStatus = 0) {
                  this._router.navigate(['']);
                } 
              }
          });
      }
}