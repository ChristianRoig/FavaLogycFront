import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuscarLoteService } from './buscar-lote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { Debounce } from 'app/shared/decorators/debounce';

export interface Lotes {

  id: number;
  nombre: string;
}

export interface BodyDetalle{

  desdeLote : string;
  hastaLote : string;
}

const ELEMENT_DATA_ARTICULOS: Lotes[] = [
];

@Component({
  selector: 'app-buscar-lote',
  templateUrl: './buscar-lote.component.html',
  styleUrls: ['./buscar-lote.component.scss']
})


export class BuscarLoteComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nombre', 'fecha', 'seleccionar'];
  dataSource2 = ELEMENT_DATA_ARTICULOS;

  body: BodyDetalle ={
    desdeLote   : null,
    hastaLote   : null
  };

  constructor(
    public dialogRef: MatDialogRef<BuscarLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _buscarLoteService: BuscarLoteService,
    private _dialog: MatDialog,
    private _router: Router) {}

  ngOnInit(): void {

    this.body.desdeLote = this.data.fechaDesde;
    this.body.hastaLote = this.data.fechaHasta;



    this._buscarLoteService.getLotesPorFecha(this.body, this.data.lote).subscribe(data => {
      this.dataSource2 = data.datos;
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

  seleccionar(lote){
    console.log(lote);
    localStorage.setItem('Lote', JSON.stringify(lote));
    this.dialogRef.close();
  }

}
