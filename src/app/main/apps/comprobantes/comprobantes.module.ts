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
import { ComprobantesListaComponent } from './comprobantes-lista/comprobantes-lista.component';
import { TableComprobantesComponent } from './table-comprobantes/table-comprobantes.component';
import { TableComprobantesSinRemitirComponent } from './table-comprobantes-sin-remitir/table-comprobantesSR.component';
import { TableArticulosComponent } from './table-articulos/table-articulos.component';

//services
import { ComprobantesListaService } from './comprobantes-lista/comprobantes-lista.service';
import { TableComprobantesService } from './table-comprobantes/table-comprobantes.service';
import { TableComprobantesSinRemitirService } from './table-comprobantes-sin-remitir/table-comprobantesSR.service';
import { TableArticulosService } from './table-articulos/table-articulos.service';
import { TablePedidosComponent } from './table-pedidos/table-pedidos.component';
import { TablePedidosService } from './table-pedidos/table-pedidos.service';

const routes: Routes = [
    {
        path     : 'lista-comprobantes',
        component: ComprobantesListaComponent
    }
];

@NgModule({
    declarations: [
        ComprobantesListaComponent,
        TableComprobantesComponent,
        TableComprobantesSinRemitirComponent,
        TableArticulosComponent,
        TablePedidosComponent
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
        ComprobantesListaService,
        TableComprobantesService,
        TableComprobantesSinRemitirService,
        TableArticulosService,
        TablePedidosService
    ]
})

export class ComprobantesModule
{
}