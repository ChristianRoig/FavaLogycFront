import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { FuseSidebarModule } from '@fuse/components';

import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { TablaRetractilModule } from 'app/components/tabla-retractil/tabla-retractil.module';

//components
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { PedidosVisualizacionComponent } from './pedidos-visualizacion/pedidos-visualizacion.component';
import { PedidosAnularComponent } from './pedidos-anular/pedidos-anular.component';
import { PedidosDatosEntregaComponent } from './pedidos-visualizacion/pedidos-datos-entrega/pedidos-datos-entrega.component';
import { PedidosTrazabilidadComponent } from './pedidos-visualizacion/pedidos-trazabilidad/pedidos-trazabilidad.component';
import { PedidosComprobantesComponent } from './pedidos-visualizacion/pedidos-comprobantes/pedidos-comprobantes.component';
import { PedidosCrear1Component } from './pedidos-crear-1/pedidos-crear-1.component';
import { PedidosCrear2Component } from './pedidos-crear-2/pedidos-crear-2.component';
import { PedidosCupaComponent } from './pedidos-visualizacion/pedidos-cupa/pedidos-cupa.component';
import { AgregarDatosEntregaComponent } from './pedidos-crear-2/agregar-datos-entrega/agregar-datos-entrega.component';
import { FiltrosComponent } from './pedidos-lista/filtros/filtros.component';

//services
import { PedidosListaService } from './pedidos-lista/pedidos-lista.service';
import { PedidosVisualizacionService } from './pedidos-visualizacion/pedidos-visualizacion.service';
import { PedidosAnularService } from './pedidos-anular/pedidos-anular.service';
import { PedidosCrear1Service } from './pedidos-crear-1/pedidos-crear-1.service';
import { PedidosCrear2Service } from './pedidos-crear-2/pedidos-crear-2.service';
import { FiltrosService } from './pedidos-lista/filtros/filtros.service';


//components
import { ComprobantesListaComponent } from './comprobantes/comprobantes-lista/comprobantes-lista.component';
import { TableComprobantesComponent } from './comprobantes/table-comprobantes/table-comprobantes.component';
import { TableComprobantesAprogramarComponent } from './comprobantes/table-comprobantes-a-programar/table-comprobantes-a-programar.component';
import { TableArticulosComponent } from './comprobantes/table-articulos/table-articulos.component';

//services
import { ComprobantesListaService } from './comprobantes/comprobantes-lista/comprobantes-lista.service';
import { TableComprobantesService } from './comprobantes/table-comprobantes/table-comprobantes.service';
import { TableComprobantesAprogramarService } from './comprobantes/table-comprobantes-a-programar/table-comprobantes-a-programar.service';
import { TableArticulosService } from './comprobantes/table-articulos/table-articulos.service';
import { TablePedidosComponent } from './comprobantes/table-pedidos/table-pedidos.component';
import { TablePedidosService } from './comprobantes/table-pedidos/table-pedidos.service';

const routes: Routes = [
    {
        path     : 'lista-articulos',
        component: PedidosListaComponent
    },
    {
        path     : 'ver-pedido/:id',        
        component: PedidosVisualizacionComponent
    },
    {
        path     : 'anular/:id',
        component: PedidosAnularComponent
    },
    {
        path     : 'crear-pedido',             
        component: PedidosCrear1Component
    },
    {
        path     : 'crear-pedido2/:modo',
        component: PedidosCrear2Component
    },
    {
        path     : 'lista-comprobantes',
        component: ComprobantesListaComponent
    }
];

@NgModule({
    declarations: [
        PedidosListaComponent,
        PedidosVisualizacionComponent,
        PedidosAnularComponent,
        PedidosDatosEntregaComponent,
        PedidosTrazabilidadComponent,
        PedidosComprobantesComponent,
        PedidosCupaComponent,
        PedidosCrear1Component,
        PedidosCrear2Component,
        AgregarDatosEntregaComponent,
        FiltrosComponent,
        ComprobantesListaComponent,
        TableComprobantesComponent,
        TableComprobantesAprogramarComponent,
        TableArticulosComponent,
        TablePedidosComponent,

    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,
        FuseSidebarModule,
        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule,
        TablaRetractilModule
    ],
    providers   : [
        PedidosListaService,
        PedidosVisualizacionService,
        PedidosAnularService,
        PedidosCrear1Service,
        PedidosCrear2Service,
        FiltrosService,
        ComprobantesListaService,
        TableComprobantesService,
        TableComprobantesAprogramarService,
        TableArticulosService,
        TablePedidosService,
 
    ]
})

export class PedidosModule
{
}