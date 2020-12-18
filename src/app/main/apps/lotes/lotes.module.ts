// modulos angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';

// modulos fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

// modulos lotes
import { LoteCrearLoteComponent } from './lote-crear-lote/lote-crear-lote.component';
import { LoteCrearLoteService } from './lote-crear-lote/lote-crear-lote.service';
import { ListaLotesComponent } from './lista-lotes/lista-lotes.component';
import { ListaLotesService } from './lista-lotes/lista-lotes.service';
import { BuscarLoteComponent } from './lista-lotes/buscar-lote/buscar-lote.component';
import { BuscarLoteService } from './lista-lotes/buscar-lote/buscar-lote.service';
import { VerImpresorasComponent } from './lista-lotes/ver-impresoras/ver-impresoras.component';
import { VerImpresorasService } from './lista-lotes/ver-impresoras/ver-impresoras.service';
import { VerCupasService } from './lista-lotes/ver-cupas/ver-cupas.service';
import { VerCupasComponent } from './lista-lotes/ver-cupas/ver-cupas.component';

const routes: Routes = [
    /* {
        path     : 'administrar-lote',
        component: LoteAdministrarLoteComponent
    }, */
    {
        path     : 'lista-lotes',
        component: ListaLotesComponent
    },
    {
        path     : 'crear-lote',
        component: LoteCrearLoteComponent
    }
]
@NgModule({
    declarations: [
        LoteCrearLoteComponent,
        //LoteAdministrarLoteComponent, //borrar
        BuscarLoteComponent,
        VerCupasComponent,
        VerImpresorasComponent,
        ListaLotesComponent
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
        LoteCrearLoteService,
        //LoteAdministrarLoteService,
        BuscarLoteService,
        VerCupasService,
        VerImpresorasService,
        ListaLotesService,
    ]
})

export class LotesModule
{
}