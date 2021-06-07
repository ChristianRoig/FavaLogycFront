import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popUpOrdenControlada',
  templateUrl: './popUpOrdenControlada.component.html',
  styleUrls: ['./popUpOrdenControlada.component.scss']
})

export class PopUpOrdenControladaComponent implements OnInit {
  
  modo: string;
  idLote: number;


  idOrdenDist: number;
  nombreOrden: string;

  constructor(  public matDialogRef: MatDialogRef<PopUpOrdenControladaComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _dialog: MatDialog,
                private _router: Router ) {          }

  ngOnInit(): void {
    this.idOrdenDist = this.data.idOrdenDist;
    this.nombreOrden = this.data.orden.nombre;
  }

  navegarAlista(){
    this._dialog.closeAll();
    let ruta = `carga/control-de-carga`;
    this._router.navigate([ruta]);
  }

}