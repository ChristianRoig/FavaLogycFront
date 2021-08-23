import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

//fava
import { MaterialDesignModule } from '@material/material-design.module';
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';

//componentes
import { PedidosPartesArticuloComponent } from './partes-articulos/partes-articulo/partes-articulo.component';
import { PedidosPartesArticuloEditarComponent } from './partes-articulos/partes-articulo-editar/partes-articulo-editar.component';
import { PedidosCodigosBarraComponent } from './codigos-de-barras/codigos-barra/codigos-barra.component';
import { PedidosCodigosBarraEditarComponent } from './codigos-de-barras/codigos-barra-editar/codigos-barra-editar.component';
import { PedidosCodigosBarraAddComponent } from './codigos-de-barras/codigos-barra-add/codigos-barra-add.component';
import { PedidosCodigosBarraArticulosComponent } from './codigos-de-barras/codigos-barra-articulos/codigos-barra-articulos.component';
import { ModalConfirmacionBorrarComponent } from './codigos-de-barras/codigos-barra/modal-confirmacion-borrar/modal-confirmacion-borrar.component';
import { ImprimirCodBarraComponent } from './codigos-de-barras/codigos-barra/imprimir-cod-barra/imprimir-cod-barra.component';

//services
import { PedidosPartesArticulosService } from './partes-articulos/partes-articulo/partes-articulo.service';
import { PedidosPartesArticulosEditarService } from './partes-articulos/partes-articulo-editar/partes-articulo-editar.service';
import { PedidosCodigosBarraEditarService } from './codigos-de-barras/codigos-barra-editar/codigos-barra-editar.service';
import { PedidosCodigosBarraAddService } from './codigos-de-barras/codigos-barra-add/codigos-barra-add.service';
import { PedidosCodigosBarraService } from './codigos-de-barras/codigos-barra/codigos-barra.service';
import { PedidosCodigosBarraArticulosService } from './codigos-de-barras/codigos-barra-articulos/codigos-barra-articulos.service';
import { ImprimirCodBarraService } from './codigos-de-barras/codigos-barra/imprimir-cod-barra/imprimir-cod-barra.service';
import { ModalConfirmacionComponent } from './partes-articulos/partes-articulo-editar/modal-confirmacion/modal-confirmacion.component';



const routes: Routes = [
    /* {
        path        : 'administracion',
        loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
    }, */
    {
        path     : 'partes-articulo',
        component: PedidosPartesArticuloComponent
    },
    {
        path     : 'partes-articulo/:id',
        component: PedidosPartesArticuloEditarComponent
    },
    {
        path     : 'codigos-barra/:id',
        component: PedidosCodigosBarraComponent
    },
    {
        path     : 'codigos-barra-articulos/:id',
        component: PedidosCodigosBarraArticulosComponent
    },
    {
        path     : 'codigos-barra/:codArt/:id',
        component: PedidosCodigosBarraEditarComponent
    },
    {
        path     : 'codigos-barra-add/:codArt',
        component: PedidosCodigosBarraAddComponent
    }
];

@NgModule({
    declarations: [
        PedidosPartesArticuloComponent,
        PedidosPartesArticuloEditarComponent,
        PedidosCodigosBarraComponent,
        PedidosCodigosBarraEditarComponent,
        PedidosCodigosBarraAddComponent,
        PedidosCodigosBarraArticulosComponent,
        ModalConfirmacionBorrarComponent,
        ImprimirCodBarraComponent,
        ModalConfirmacionComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,

        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule,
        MatProgressSpinnerModule
        
    ],
    providers   : [
        PedidosPartesArticulosService,
        PedidosPartesArticulosEditarService,
        PedidosCodigosBarraAddService,
        PedidosCodigosBarraEditarService,
        PedidosCodigosBarraService,
        PedidosCodigosBarraArticulosService,
        ImprimirCodBarraService
    ]
    
})
export class ArticulosModule
{
}