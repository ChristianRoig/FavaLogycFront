import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//components
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

//services
import { PedidosCodigosBarraAddService } from './codigos-barra-add.service'

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector     : 'codigos-barra-add',
    templateUrl  : './codigos-barra-add.component.html',
    styleUrls    : ['./codigos-barra-add.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})

export class PedidosCodigosBarraAddComponent implements OnInit {
    
  form: FormGroup;

  dataSource2: any;
  subParametros: Subscription;
  id:number;
  cantidad: number;
  codigoArticulo: string;
  nombre: string;
  descripcion: string;
  codigoDeBarras: string;
  nroParte: number;

  page: number = 0;
  size: number = 1;
  columna: string = 'id';
  order: string = 'asc';


  constructor(
      private _router: Router,
      private route: ActivatedRoute,
      private _pedidosCodigosBarraAddService: PedidosCodigosBarraAddService,
      private _dialog: MatDialog,
      private _formBuilder: FormBuilder
  )
  {
      
  }

    

  ngOnInit(): void{

      this.form = this._formBuilder.group({
        codigoBarras   : ['', Validators.required],
        descripcion: ['', Validators.required]
      });

      this.subParametros = this.route.params.subscribe(params => {
          this.codigoArticulo = params['codArt'];
      })

      this._pedidosCodigosBarraAddService.getCodigoBarra(this.codigoArticulo, this.page, this.size, this.columna, this.order)
        .subscribe( 
          data => {
            this.dataSource2 = data.datos;
            this.id = this.dataSource2[0].articulo.id;
            this.nombre = this.dataSource2[0].articulo.nombre;
            this.nroParte = this.dataSource2[0].nroParte;
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
                        let titulo = 'Código de Barras no encontrada';
                        let mensaje = err.error.message.toString();
                        this.mostrarError(errStatus, titulo, mensaje);
                    }
                }
            }
      );        
  }

  volver(){
      let ruta = `articulos/codigos-barra/${this.codigoArticulo}`;
      this._router.navigate([ruta]);
  }

  agregar(){
    
    let body = {
      "codigoDeBarras": this.codigoDeBarras,
      "descripcion": this.descripcion,
      "idArticulo": this.id,
      "nroParte": this.nroParte
    }
      
    this._pedidosCodigosBarraAddService.postCodigoBarra( body ).subscribe( data => {
        console.log("entro");
        this.volver();
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
            let titulo = 'Error al Agregar';
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