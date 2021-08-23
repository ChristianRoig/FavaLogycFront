import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popUpLoteControlado',
  templateUrl: './popUpLoteControlado.component.html',
  styleUrls: ['./popUpLoteControlado.component.scss']
})

export class PopUpLoteCreado implements OnInit {
  
  modo: string;
  idLote: number;
  nombreLote: string;

  constructor(  public matDialogRef: MatDialogRef<PopUpLoteCreado>,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private _dialog: MatDialog,
                private _router: Router ) {          }

  ngOnInit(): void {
    this.idLote = this.data.idLote;
    this.modo = this.data.modo;
    this.nombreLote = this.data.lote.nombre;
  }

  navegarAlista(){
    this._dialog.closeAll();
    let ruta = `lotes/control/lote-en/${ this.modo }`;
    this._router.navigate([ruta]);
  }
}
