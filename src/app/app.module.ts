import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule } from '@angular/forms';

//import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PagesModule } from './main/pages/pages.module';
import { LoginModule } from './main/pages/login/login.module';
import { LoginComponent } from './main/pages/login/login.component';
import { Error404Module } from './main/pages/404/error-404.module';
import { SharedModule } from './shared/shared.module';
import { SonidoService } from './services/sonidos.service';

import { ProjectDashboardComponent } from './main/apps/tablero/tablero.component';
import { PlantillaFondoComponent } from './shared/custom-tags/plantilla-fondo/plantilla-fondo.component';
import { AuthInterceptor } from './shared/x_NOSEUSA_interceptors/auth.interceptor';
import { UsuarioGuard } from './shared/x_NOSEUSA_guards/usuario.guard';
import { SampleModule } from './main/x_NOSEUSA_sample/sample.module';


const appRoutes: Routes = [
    
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule),
        //component   : ProjectDashboardComponent
        // canLoad: [UsuarioGuard]
    },
    {
        path        : 'pages/auth/login',
        component   : LoginComponent
    },
    {
        path        : 'error-404',
        loadChildren: () => import('./main/pages/404/error-404.module').then(m => m.Error404Module),
    },
    {
        path: '',
        redirectTo: 'pages/auth/login',
        pathMatch: 'full'
    },
    {
        path      : '**',
        redirectTo: 'error-404'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        MatProgressSpinnerModule,

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
        // NO SE USA: SampleModule,
        LayoutModule,
        PagesModule,
        SharedModule,
        LoginModule,
        Error404Module


    ],
    providers: [
        SonidoService,
        //{ provide: LocationStrategy, useClass: HashLocationStrategy }
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
