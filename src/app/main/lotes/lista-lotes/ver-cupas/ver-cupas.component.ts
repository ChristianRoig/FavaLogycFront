import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerCupasService } from './ver-cupas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
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

const ELEMENT_DATA: CUPAS[] = [
  {nroParte: 1, CUPA: "", nombre: "Lexmart",},
  {nroParte: 2, CUPA: "", nombre: "cute",},
  {nroParte: 3, CUPA: "", nombre: "hp",},
  {nroParte: 4, CUPA: "", nombre: "samsung",},
  {nroParte: 5, CUPA: "", nombre: "zebra",},
];

@Component({
  selector: 'app-ver-cupas',
  templateUrl: './ver-cupas.component.html',
  styleUrls: ['./ver-cupas.component.scss']
})


export class VerCupasComponent implements OnInit {


  displayedColumns: string[] = ['nroParte', 'CUPA', 'nombre', 'seleccionar'];
  dataSource2 = ELEMENT_DATA;

  constructor(
    public dialogRef: MatDialogRef<VerCupasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _verCupasService: VerCupasService,
    private _dialog: MatDialog,
    private _router: Router) {}

  ngOnInit(): void {

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

  imprimir(lote){
    console.log("imprimir");
  }

}
