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
import { PedidosDatosEntregaComponent } from './pedidos-venta-visualizacion/pedidos-datos-entrega/pedidos-datos-entrega.component';
import { PedidosTrazabilidadComponent } from './pedidos-venta-visualizacion/pedidos-trazabilidad/pedidos-trazabilidad.component';
import { PedidosComprobantesComponent } from './pedidos-venta-visualizacion/pedidos-comprobantes/pedidos-comprobantes.component';
import { PedidosAgregarPedido1Service } from './pedidos-agregar-pedido-1/pedidos-agregar-pedido-1.service';
import { PedidosAgregarPedido1Component } from './pedidos-agregar-pedido-1/pedidos-agregar-pedido-1.component';
import { PedidosAgregarPedido2Component } from './pedidos-agregar-pedido-2/pedidos-agregar-pedido-2.component';
import { PedidosAgregarPedido2Service } from './pedidos-agregar-pedido-2/pedidos-agregar-pedido-2.service';
import { PedidosCupaComponent } from './pedidos-venta-visualizacion/pedidos-cupa/pedidos-cupa.component';
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
    {
        path     : 'addPedido1',
        component: PedidosAgregarPedido1Component
    },
    {
        path     : 'addPedido2/:modo',
        component: PedidosAgregarPedido2Component
    }
];

@NgModule({
    declarations: [
        PedidosListaComponent,
        PedidosVentaVisualizacionComponent,
        PedidosAnularComponent,
        PedidosAgregarLoteComponent,
        PedidosDatosEntregaComponent,
        PedidosTrazabilidadComponent,
        PedidosComprobantesComponent,
        PedidosCupaComponent,
        PedidosAgregarPedido1Component,
        PedidosAgregarPedido2Component
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
        PedidosAgregarLoteService,
        PedidosAgregarPedido1Service,
        PedidosAgregarPedido2Service
    ]
})

export class AdministracionModule
{
}