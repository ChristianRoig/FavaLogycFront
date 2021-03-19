import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidosCodigosBarraComponent } from '../codigos-barra.component';

@Component({
  selector: 'app-modal-confirmacion-borrar',
  templateUrl: './modal-confirmacion-borrar.component.html'
})
export class ModalConfirmacionBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PedidosCodigosBarraComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
