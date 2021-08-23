// modulos angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// modulos fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

// modulos fava
import { MaterialDesignModule } from '@material/material-design.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';

// componentes
import { LoteCrearLoteComponent } from './lote-crear-lote/lote-crear-lote.component';
import { ListaLotesComponent } from './lista-lotes/lista-lotes.component';
import { VerImpresorasComponent } from './lista-lotes/ver-impresoras/ver-impresoras.component';
import { VerCupasComponent } from './lista-lotes/ver-cupas/ver-cupas.component';
import { VerLoteComponent } from './lista-lotes/ver-lote/ver-lote.component';
import { ConfirmarAgregarLoteComponent } from './lote-crear-lote/confirmar-agregarLote/confirmar-agregarLote.component';
import { ModalDeseaImprimirLoteComponent } from './lote-crear-lote/modal-desea-imprimir/modal-desea-imprimir.component';
import { ModalConfirmacionBorrarComponent } from './lista-lotes/ver-lote/modal-confirmacion-borrar/modal-confirmacion-borrar.component';

// servicios
import { LoteCrearLoteService } from './lote-crear-lote/lote-crear-lote.service';
import { ListaLotesService } from './lista-lotes/lista-lotes.service';
import { VerImpresorasService } from './lista-lotes/ver-impresoras/ver-impresoras.service';
import { VerCupasService } from './lista-lotes/ver-cupas/ver-cupas.service';
import { VerLoteService } from './lista-lotes/ver-lote/ver-lote.service';
import { ConfirmarAgregarLoteService } from './lote-crear-lote/confirmar-agregarLote/confirmar-agregarLote.service';
import { ControlEstanteriaComponent } from './control-busqueda/control-busqueda.component';
import { ControlarLoteComponent } from './controlar-lote/controlar-lote.component';
import { PopUpLoteCreado } from './controlar-lote/popUpLoteControlado/popUpLoteControlado.component';
import { TablaRetractilModule } from '@fava/components/tabla-retractil/tabla-retractil.module';
import { ControlBusquedaService } from './control-busqueda/control-busqueda.service';
import { ControlarLoteService } from './controlar-lote/controlar-lote.service';



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
    {
        path     : 'control/lote-en/:modo',
        component: ControlEstanteriaComponent
    },
    {
        path     : 'control/lote-en/:modo/:id',
        component: ControlarLoteComponent
    }
]
@NgModule({
    declarations: [
        LoteCrearLoteComponent,
        VerCupasComponent,
        VerImpresorasComponent,
        ListaLotesComponent,
        VerLoteComponent,
        ModalDeseaImprimirLoteComponent,
        ModalConfirmacionBorrarComponent,
        ConfirmarAgregarLoteComponent,
        ControlEstanteriaComponent,
        ControlarLoteComponent,
        PopUpLoteCreado
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
        MatProgressSpinnerModule,
        TablaRetractilModule
    ],
    providers   : [
        LoteCrearLoteService,
        VerCupasService,
        VerImpresorasService,
        ListaLotesService,
        VerLoteService,
        ConfirmarAgregarLoteService,
        ControlBusquedaService,
        ControlarLoteService
    ]
})

export class LotesModule
{
}