import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VerLoteComponent } from '../ver-lote.component';

@Component({
  selector: 'app-modal-confirmacion-borrar',
  templateUrl: './modal-confirmacion-borrar.component.html',
  styleUrls: ['./modal-confirmacion-borrar.scss']
})
export class ModalConfirmacionBorrarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
