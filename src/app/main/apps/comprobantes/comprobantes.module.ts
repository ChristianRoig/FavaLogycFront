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

//services
import { ComprobantesListaService } from './comprobantes-lista/comprobantes-lista.service';

const routes: Routes = [
    {
        path     : 'lista-comprobantes',
        component: ComprobantesListaComponent
    }
];

@NgModule({
    declarations: [
        ComprobantesListaComponent
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
        ComprobantesListaService
    ]
})

export class ComprobantesModule
{
}