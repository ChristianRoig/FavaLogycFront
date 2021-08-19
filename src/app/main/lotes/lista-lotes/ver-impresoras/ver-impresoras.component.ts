import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerImpresorasService } from './ver-impresoras.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { MatTableDataSource } from '@angular/material/table';
import { Debounce } from 'app/shared/decorators/debounce';

export interface CUPAS {

  nroParte: number;
  CUPA: string;
  nombre: string
}

export interface BodyDetalle{

  desdeLote : string;
  hastaLote : string;
}

@Component({
  selector: 'app-ver-impresoras',
  templateUrl: './ver-impresoras.component.html',
  styleUrls: ['./ver-impresoras.component.scss']
})


export class VerImpresorasComponent implements OnInit {


  displayedColumns: string[] = ['impresora', 'seleccionar'];
  dataSource2: any;

  constructor(
    public dialogRef: MatDialogRef<VerImpresorasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _verImpresorasService: VerImpresorasService,
    private _dialog: MatDialog,
    private _router: Router) {}

  ngOnInit(): void {

    console.log(this.data.pedidos._selected);

    this._verImpresorasService.getImpresoras().subscribe(data => {
      this.dataSource2 = new MatTableDataSource<any>(data.datos);
      
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
          let titulo = 'Error al listar';
          let mensaje = err.error.message.toString();
          this.mostrarError(errStatus, titulo, mensaje);
        }
      }
    });

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
            this._router.navigate(['']);
          }
      });
  }

  seleccionar(impresora){
    localStorage.setItem('ImpresoraCUPA', impresora)
    this.dialogRef.close();
  }
}
