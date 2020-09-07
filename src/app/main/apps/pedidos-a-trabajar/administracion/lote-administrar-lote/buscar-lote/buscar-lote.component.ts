import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BuscarLoteService } from './buscar-lote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

export interface Lotes {

  id: number;
  nombre: string;
}

const ELEMENT_DATA_ARTICULOS: Lotes[] = [
  {id: 1,nombre: "Lote 10/05/2020 - Miramar"},
  {id: 2,nombre: "Lote 10/05/2020 - Centrar"},
  {id: 3,nombre: "Lote 10/05/2020 - Pinamar"}
];

@Component({
  selector: 'app-buscar-lote',
  templateUrl: './buscar-lote.component.html',
  styleUrls: ['./buscar-lote.component.scss']
})


export class BuscarLoteComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nombre', 'seleccionar'];
  dataSource2 = ELEMENT_DATA_ARTICULOS;

  constructor(
    public dialogRef: MatDialogRef<BuscarLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _buscarLoteService: BuscarLoteService,
    private _dialog: MatDialog,
    private _router: Router) {}

  ngOnInit(): void {

    this._buscarLoteService.getPartesArticulos(this.data.lote).subscribe(data => {
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
    localStorage.setItem('Lote', lote);
    this.dialogRef.close();
  }

}
