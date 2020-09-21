import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { VerImpresorasComponent } from './lote-administrar-lote/ver-impresoras/ver-impresoras.component';
import { VerImpresorasService } from './lote-administrar-lote/ver-impresoras/ver-impresoras.service';
import { VerCupasService } from './lote-administrar-lote/ver-cupas/ver-cupas.service';
import { VerCupasComponent } from './lote-administrar-lote/ver-cupas/ver-cupas.component';
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
import { AgregarDatosEntregaComponent } from './pedidos-agregar-pedido-2/agregar-datos-entrega/agregar-datos-entrega.component';
import { LoteCrearLoteComponent } from './lote-crear-lote/lote-crear-lote.component';
import { LoteCrearLoteService } from './lote-crear-lote/lote-crear-lote.service';
import { LoteAdministrarLoteComponent } from './lote-administrar-lote/lote-administrar-lote.component';
import { LoteAdministrarLoteService } from './lote-administrar-lote/lote-administrar-lote.service';
import { BuscarLoteComponent } from './lote-administrar-lote/buscar-lote/buscar-lote.component';
import { BuscarLoteService } from './lote-administrar-lote/buscar-lote/buscar-lote.service';
import { ModalDeseaImprimirLoteComponent } from './pedidos-agregar-lote/modal-confirmacion-borrar/modal-desea-imprimir.component';
import { ControlEstanteriaComponent } from './control-estanteria/control-estanteria.component';
import { ControlEstanteriaService } from './control-estanteria/control-estanteria.service';

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
    },
    {
        path     : 'crear-lote',
        component: LoteCrearLoteComponent
    },
    {
        path     : 'administrar-lote',
        component: LoteAdministrarLoteComponent
    },
    {
        path     : 'control-estanteria',
        component: ControlEstanteriaComponent
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
        PedidosAgregarPedido2Component,
        AgregarDatosEntregaComponent,
        LoteCrearLoteComponent,
        LoteAdministrarLoteComponent,
        BuscarLoteComponent,
        VerCupasComponent,
        VerImpresorasComponent,
        ModalDeseaImprimirLoteComponent,
        ControlEstanteriaComponent
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
        PedidosAgregarPedido2Service,
        LoteCrearLoteService,
        LoteAdministrarLoteService,
        BuscarLoteService,
        VerCupasService,
        VerImpresorasService,
        ControlEstanteriaService
    ]
})

export class AdministracionModule
{
}