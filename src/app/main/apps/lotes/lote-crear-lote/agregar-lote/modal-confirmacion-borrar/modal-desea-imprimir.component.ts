import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule  } from '@angular/material/dialog';
import { LoteAgregarLoteComponent } from '../agregar-lote.component';

@Component({
  selector: 'app-modal-desea-imprimir',
  templateUrl: './modal-desea-imprimir.component.html'
})
export class ModalDeseaImprimirLoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoteAgregarLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
