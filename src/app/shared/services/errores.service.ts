import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SonidoService } from 'app/shared/services/sonidos.service';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private dialog: MatDialog,
              private _serviceSonido: SonidoService) { }

  error(res) {
    
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        res: res.error.message
      }
    });

    dialogRef.afterOpened().subscribe(result => {
        this._serviceSonido.playAudioAlert();
    });
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    <p>{{this.datos}}</p>
  `,
})
export class DialogDataExampleDialog {
  datos = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.datos = data.res;
  }
}
