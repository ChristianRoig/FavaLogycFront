// modulos angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// modulos fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

// componentes
import { LoteCrearLoteComponent } from './lote-crear-lote/lote-crear-lote.component';
import { ListaLotesComponent } from './lista-lotes/lista-lotes.component';
import { VerImpresorasComponent } from './lista-lotes/ver-impresoras/ver-impresoras.component';
import { VerCupasComponent } from './lista-lotes/ver-cupas/ver-cupas.component';
import { VerLoteComponent } from './lista-lotes/ver-lote/ver-lote.component';
//import { LoteAgregarLoteComponent } from '../lotes/lote-crear-lote/agregar-lote/agregar-lote.component';
import { ConfirmarAgregarLoteComponent } from './lote-crear-lote/confirmar-agregarLote/confirmar-agregarLote.component';
import { ModalDeseaImprimirLoteComponent } from './lote-crear-lote/modal-desea-imprimir/modal-desea-imprimir.component';
//import { ModalDeseaImprimirLoteComponent } from './lote-crear-lote/agregar-lote/modal-confirmacion-borrar/modal-desea-imprimir.component';
import { ModalConfirmacionBorrarComponent } from './lista-lotes/ver-lote/modal-confirmacion-borrar/modal-confirmacion-borrar.component';

// servicios
import { LoteCrearLoteService } from './lote-crear-lote/lote-crear-lote.service';
import { ListaLotesService } from './lista-lotes/lista-lotes.service';
import { VerImpresorasService } from './lista-lotes/ver-impresoras/ver-impresoras.service';
import { VerCupasService } from './lista-lotes/ver-cupas/ver-cupas.service';
import { VerLoteService } from './lista-lotes/ver-lote/ver-lote.service';
//import { LoteAgregarLoteService } from '../lotes/lote-crear-lote/agregar-lote/agregar-lote.service';
import { ConfirmarAgregarLoteService } from './lote-crear-lote/confirmar-agregarLote/confirmar-agregarLote.service';



const routes: Routes = [
    {
        path     : 'ver-lote/:id',
        component: VerLoteComponent
    },
    {
        path     : 'lista-lotes',
        component: ListaLotesComponent
    },
    {
        path     : 'crear-lote',
        component: LoteCrearLoteComponent
    },
    /* {
        path     : 'agregar-lote',
        component: LoteAgregarLoteComponent
    }, */
]
@NgModule({
    declarations: [
        LoteCrearLoteComponent,
        VerCupasComponent,
        VerImpresorasComponent,
        ListaLotesComponent,
        VerLoteComponent,
        //LoteAgregarLoteComponent,
        ModalDeseaImprimirLoteComponent,
        ModalConfirmacionBorrarComponent,
        ConfirmarAgregarLoteComponent
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
        MatProgressSpinnerModule
    ],
    providers   : [
        LoteCrearLoteService,
        VerCupasService,
        VerImpresorasService,
        ListaLotesService,
        VerLoteService,
        //LoteAgregarLoteService,
        ConfirmarAgregarLoteService
    ]
})

export class LotesModule
{
}