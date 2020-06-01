import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators   } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRecuperarContrasenaComponent } from './modal-recuperar-contrasena/modal-recuperar-contrasena.component';

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
        private _dialog: MatDialog
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
            email   : ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ingresar() {

        let email   = this.loginForm.get('email').value;
        let password= this.loginForm.get('password').value;
        // this._usuarioService.login(email, password)

        this._router.navigate(['/apps'])
    }


    recuperarContrasena() {

            const dialogRef = this._dialog.open(ModalRecuperarContrasenaComponent);
        
            dialogRef.afterClosed().subscribe(result => {
            //   console.log(`Dialog result: ${result}`);
            });
    }        


}
