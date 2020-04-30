import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/login/login.module';
import { Routes } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';

@NgModule({
    declarations: [
        
    ],
    imports: [
        // Authentication
        LoginModule
    ],
    providers: [
        UsuarioService
    ]

})
export class PagesModule
{
    
}
