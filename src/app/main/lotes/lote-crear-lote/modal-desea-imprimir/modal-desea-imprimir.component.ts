import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { ConfirmarAgregarLoteComponent } from '../confirmar-agregarLote/confirmar-agregarLote.component';

@Component({
  selector: 'app-modal-desea-imprimir',
  templateUrl: './modal-desea-imprimir.component.html'
})
export class ModalDeseaImprimirLoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmarAgregarLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
