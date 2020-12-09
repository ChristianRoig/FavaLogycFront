import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';

import { LoteCrearLoteComponent } from './lote-crear-lote/lote-crear-lote.component';
import { LoteCrearLoteService } from './lote-crear-lote/lote-crear-lote.service';

import { LoteAdministrarLoteComponent } from './lote-administrar-lote/lote-administrar-lote.component';
import { LoteAdministrarLoteService } from './lote-administrar-lote/lote-administrar-lote.service';

import { BuscarLoteComponent } from './lote-administrar-lote/buscar-lote/buscar-lote.component';
import { BuscarLoteService } from './lote-administrar-lote/buscar-lote/buscar-lote.service';

const routes: Routes = [
    {
        path     : 'administrar-lote',
        component: LoteAdministrarLoteComponent
    },
    {
        path     : 'crear-lote',
        component: LoteCrearLoteComponent
    }
]
@NgModule({
    declarations: [
        LoteCrearLoteComponent,
        LoteAdministrarLoteComponent,
        BuscarLoteComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,
        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule
    ],
    providers   : [
        LoteCrearLoteService,
        LoteAdministrarLoteService,
        BuscarLoteService
    ]
})

export class AdministracionModule
{
}