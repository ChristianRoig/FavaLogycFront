import {Component, ViewEncapsulation, OnInit, HostBinding} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosCodigosBarraEditarService } from './codigos-barra-editar.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

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
    dataSource: any;
    subParametros: Subscription;
    id:number;
    codigoArticulo:string;
    nombre:string;
    codigoDeBarras: string;
    descripcion: string;

    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _pedidosCodigosBarraEditarService: PedidosCodigosBarraEditarService,
        private _dialog: MatDialog
    )
    {
        
    }

    ngOnInit(): void{
        
        this.subParametros = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.codigoArticulo = params['codArt'];
        })

        this._pedidosCodigosBarraEditarService.getCodigoBarra(this.id).subscribe(
          data => {
            this.dataSource = data;
            this.codigoDeBarras = this.dataSource.codigoDeBarras;
            this.descripcion = this.dataSource.descripcion;
            this.nombre = this.dataSource.articulo.nombre;
            this.codigoArticulo = this.dataSource.articulo.codigoArticulo;
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
                      let titulo = 'Código de Barras no encontrado';
                      let mensaje = err.error.message.toString();
                      this.mostrarError(errStatus, titulo, mensaje);
                  }
              }
          }
        );        
    }

    volver(){
        let ruta = `apps/articulos/codigos-barra/${this.codigoArticulo}`;
        this._router.navigate([ruta]);
    }

    editar(){
        this._pedidosCodigosBarraEditarService.putCodigoBarra(this.id,this.codigoDeBarras,this.descripcion).subscribe(
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

    mostrarError(errStatus, titulo, mensaje){
      const dialogRef = this._dialog.open( ModalErrorComponent, { 
        data: {
          titulo: titulo,
          mensaje: mensaje
        } 
      });
  
      dialogRef.afterClosed()
        .subscribe(result => {
            if (errStatus != 0) {
              this.volver();
            } else {
              this._router.navigate(['']);
            }
        });
    }
}