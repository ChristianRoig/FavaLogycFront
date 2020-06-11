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
// import { MaterialDesignModule } from 'app/material-design/material-design.module';

const routes: Routes = [
    {
        path     : 'pedidos-lista',
        component: PedidosListaComponent
    }
];

@NgModule({
    declarations: [
        PedidosListaComponent
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
        PedidosListaService
    ]
})
export class AdministracionModule
{
}