import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VerRemitoComponent } from '../ver-remito.component';


@Component({
  selector: 'app-modal-confirmacion-borrar',
  templateUrl: './modal-confirmacion-borrar.component.html',
  styleUrls: ['./modal-confirmacion-borrar.component.scss']
})
export class ModalConfirmacionBorrarComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<VerRemitoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    
  }

}
