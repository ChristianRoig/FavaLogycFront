import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/login/login.module';
import { UsuarioService } from 'app/shared/services/usuario.service';

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
