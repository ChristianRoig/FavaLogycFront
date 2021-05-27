import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from 'app/main/pages/login/login.component';
import { UsuarioService } from 'app/shared/services/usuario.service';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { ModalRecuperarContrasenaComponent } from './modal-recuperar-contrasena/modal-recuperar-contrasena.component';
import { ModalUsuarioErroneoComponent } from './modal-usuario-erroneo/modal-usuario-erroneo.component';

const routes = [
    {
        path     : 'auth/login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        ModalRecuperarContrasenaComponent,
        ModalUsuarioErroneoComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MaterialDesignModule,
        FuseSharedModule
    ],
    exports     : [
        LoginComponent
    ],
    providers:[
        UsuarioService
    ]
})
export class LoginModule
{
}
