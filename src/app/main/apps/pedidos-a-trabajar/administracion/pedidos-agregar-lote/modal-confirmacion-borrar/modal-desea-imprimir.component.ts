import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidosAgregarLoteComponent } from '../pedidos-agregar-lote.component';

@Component({
  selector: 'app-modal-desea-imprimir',
  templateUrl: './modal-desea-imprimir.component.html'
})
export class ModalDeseaImprimirLoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PedidosAgregarLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
