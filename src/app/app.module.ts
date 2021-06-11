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
import { PagesModule } from './auth/auth.module';
import { LoginModule } from './auth/login/login.module';
import { Error404Module } from './auth/404/error-404.module';
import { SharedModule } from './shared/shared.module';

import { SonidoService } from './shared/services/sonidos.service';

// import { ProjectDashboardComponent } from './main/apps/tablero/tablero.component';
// import { PlantillaFondoComponent } from './shared/custom-tags/plantilla-fondo/plantilla-fondo.component';
// import { AuthInterceptor } from './shared/x_NOSEUSA_interceptors/auth.interceptor';
// import { UsuarioGuard } from './shared/x_NOSEUSA_guards/usuario.guard';
// import { SampleModule } from './main/x_NOSEUSA_sample/sample.module';


const appRoutes: Routes = [

    {
        path        : 'pedidos',
        loadChildren: () => import('./main/pedidos/pedidos.module').then(m => m.PedidosModule)
    },
    {
        path        : 'lotes',
        loadChildren: () => import('./main/lotes/lotes.module').then(m => m.LotesModule)
    },
    {
        path        : 'remitos',
        loadChildren: () => import('./main/remitos/remitos.module').then(m => m.RemitosModule)
    },
    {
        path        : 'distribucion',
        loadChildren: () => import('./main/distribucion/distribucion.module').then(m => m.DistribucionModule)
    },
    {
        path        : 'articulos',
        loadChildren: () => import('./main/articulos/articulos.module').then(m => m.ArticulosModule)
    },

    {
        path        : 'inicio',
        loadChildren: () => import('./main/tablero/tablero.module').then(m => m.TableroModule)
    },
    {
        path        : 'empaque',
        loadChildren: () => import('./main/empaque/empaque.module').then(m => m.EmpaqueModule)
    },
    {
        path        : 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    },
    {
        path        : 'error-404',
        loadChildren: () => import('./auth/404/error-404.module').then(m => m.Error404Module),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path      : '**',
        redirectTo: 'error-404',
        pathMatch: 'full'
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
        Error404Module,
        


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
