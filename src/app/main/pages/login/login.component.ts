import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators   } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRecuperarContrasenaComponent } from './modal-recuperar-contrasena/modal-recuperar-contrasena.component';
import { SonidoService } from 'app/services/sonidos.service';
import { ModalUsuarioErroneoComponent } from './modal-usuario-erroneo/modal-usuario-erroneo.component';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router, 
        private _usuarioService: UsuarioService,
        private _dialog: MatDialog,
        private _serviceSonido: SonidoService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            // email   : ['', Validators.required],
            // password: ['', Validators.required]
            email   : [''],
            password: ['']
        });
    }

    async ingresar() {

        let email   = this.loginForm.get('email').value;
        let password= this.loginForm.get('password').value;
        // this._usuarioService.login(email, password).then(res => {
        //     if(res) {
        //         this._serviceSonido.playAudioSuccess();
        //         this._router.navigate(['/apps'])
        //     } else {
            //         // logueo incorrecto
            //         this.usuarioIncorrecto();
            //     }
            // });
        this._router.navigate(['/apps'])
    }   


    recuperarContrasena() {

            const dialogRef = this._dialog.open(ModalRecuperarContrasenaComponent);
        
            dialogRef.afterClosed().subscribe(result => {
                this._serviceSonido.playAudioAlert();
            });
        }
        
    usuarioIncorrecto() {
        const dialogRef = this._dialog.open(ModalUsuarioErroneoComponent);
    
        dialogRef.afterOpened().subscribe(result => {
            this._serviceSonido.playAudioAlert();
        });
    }
}