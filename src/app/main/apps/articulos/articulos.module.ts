import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { PedidosPartesArticuloComponent } from './partes-articulos/partes-articulo/partes-articulo.component';
import { PedidosPartesArticulosService } from './partes-articulos/partes-articulo/partes-articulo.service';
import { PedidosPartesArticuloEditarComponent } from './partes-articulos/partes-articulo-editar/partes-articulo-editar.component';
import { PedidosPartesArticulosEditarService } from './partes-articulos/partes-articulo-editar/partes-articulo-editar.service';
import { PedidosCodigosBarraComponent } from './codigos-de-barras/codigos-barra/codigos-barra.component';
import { PedidosCodigosBarraEditarComponent } from './codigos-de-barras/codigos-barra-editar/codigos-barra-editar.component';
import { PedidosCodigosBarraAddComponent } from './codigos-de-barras/codigos-barra-add/codigos-barra-add.component';
import { PedidosCodigosBarraEditarService } from './codigos-de-barras/codigos-barra-editar/codigos-barra-editar.service';
import { PedidosCodigosBarraAddService } from './codigos-de-barras/codigos-barra-add/codigos-barra-add.service';
import { PedidosCodigosBarraService } from './codigos-de-barras/codigos-barra/codigos-barra.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PedidosCodigosBarraArticulosComponent } from './codigos-de-barras/codigos-barra-articulos/codigos-barra-articulos.component';
import { PedidosCodigosBarraArticulosService } from './codigos-de-barras/codigos-barra-articulos/codigos-barra-articulos.service';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { ModalConfirmacionBorrarComponent } from './codigos-de-barras/codigos-barra/modal-confirmacion-borrar/modal-confirmacion-borrar.component';
// import { MaterialDesignModule } from 'app/material-design/material-design.module';

const routes: Routes = [
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
        path     : 'codigos-barra-articulos',
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
        ModalConfirmacionBorrarComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,

        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule,
        
    ],
    providers   : [
        PedidosPartesArticulosService,
        PedidosPartesArticulosEditarService,
        PedidosCodigosBarraAddService,
        PedidosCodigosBarraEditarService,
        PedidosCodigosBarraService,
        PedidosCodigosBarraArticulosService
    ]
})
export class ArticulosModule
{
}