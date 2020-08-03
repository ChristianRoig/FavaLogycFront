import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosListaService } from './pedidos-lista/pedidos-lista.service';
import { FuseSidebarModule } from '@fuse/components';
import { PedidosVentaVisualizacionComponent } from './pedidos-venta-visualizacion/pedidos-venta-visualizacion.component';
import { PedidosVentaVisualizacionService } from './pedidos-venta-visualizacion/pedidos-venta-visualizacion.service';
import { PedidosAnularComponent } from './pedidos-venta-anular/pedidos-anular.component';
import { PedidosAnularService } from './pedidos-venta-anular/pedidos-anular.service';
import { PedidosAgregarLoteComponent } from './pedidos-agregar-lote/pedidos-agregar-lote.component';
import { PedidosAgregarLoteService } from './pedidos-agregar-lote/pedidos-agregar-lote.service';
// import { MaterialDesignModule } from 'app/material-design/material-design.module';

const routes: Routes = [
    {
        path     : 'pedidos-lista',
        component: PedidosListaComponent
    },
    {
        path     : 'visualizacion/:id',
        component: PedidosVentaVisualizacionComponent
    },
    {
        path     : 'anular/:id',
        component: PedidosAnularComponent
    },
    {
        path     : 'addLote',
        component: PedidosAgregarLoteComponent
    },
];

@NgModule({
    declarations: [
        PedidosListaComponent,
        PedidosVentaVisualizacionComponent,
        PedidosAnularComponent,
        PedidosAgregarLoteComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,
        FuseSidebarModule,
        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule
    ],
    providers   : [
        PedidosListaService,
        PedidosVentaVisualizacionService,
        PedidosAnularService,
        PedidosAgregarLoteService
    ]
})

export class AdministracionModule
{
}