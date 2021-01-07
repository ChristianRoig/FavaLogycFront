import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { PagesModule } from './main/pages/pages.module';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { PlantillaFondoComponent } from './main/custom-tags/plantilla-fondo/plantilla-fondo.component';
import { SharedModule } from './shared/shared.module';
import { SonidoService } from './services/sonidos.service';
import { UsuarioGuard } from './guards/usuario.guard';
import { LoginModule } from './main/pages/login/login.module';
import { LoginComponent } from './main/pages/login/login.component';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        // canLoad: [UsuarioGuard]
    },
    {
        path        : 'pages/auth/login',
        component   : LoginComponent
    },
    {
        path      : '**',
        redirectTo: 'pages/auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports     : [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        PagesModule,
        SharedModule,
        LoginModule
    ],
    providers: [
        SonidoService
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
