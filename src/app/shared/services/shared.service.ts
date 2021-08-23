import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { Router } from '@angular/router';

const BASE_URL = environment.server + environment.baseUrl;


@Injectable()
export class SharedService
{
    constructor( private _httpClient: HttpClient,
                 private _dialog: MatDialog,
                 private _router: Router ) { }


    manejarErrores(_err: HttpErrorResponse, _titulo: string)
    {
        if (_err.error instanceof Error) {
            console.log("Client-side error");
        } else {

            let errStatus = _err.status
            let mensaje: string
            let rta;

            if (errStatus == 0) {
                let titulo = 'Error de Servidor';
                mensaje = "Por favor comunicarse con Sistemas";
                rta = this.mostrarError(errStatus, titulo, mensaje);
            } else {
                let titulo = _titulo;
                mensaje = _err.error.message.toString();
                rta = this.mostrarError(errStatus, titulo, mensaje);
            }
            return rta;
        }
    }
    

    async mostrarError(errStatus, titulo, mensaje){

        let rta: number;

        const dialogRef = this._dialog.open( ModalErrorComponent, { 
            data: {
                titulo: titulo,
                mensaje: mensaje
            } 
        });

        return dialogRef;
    }
}
