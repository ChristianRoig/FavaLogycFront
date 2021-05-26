// modulos angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';

// modulos fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

// modulos favalogyc
import { TablaRetractilModule } from '@fava/components/tabla-retractil/tabla-retractil.module';

// componentes favalogyc
import { ControlEstanteriaComponent } from './control-busqueda/control-busqueda.component';
import { ControlarLoteComponent } from './controlar-lote/controlar-lote.component';

// servicios favalogyc
import { ControlBusquedaService } from './control-busqueda/control-busqueda.service';
import { ControlarLoteService } from '../control/controlar-lote/controlar-lote.service';
import { PopUpLoteCreado } from './controlar-lote/popUpLoteControlado/popUpLoteControlado.component';

const routes: Routes = [
    {
        path     : ':modo',
        component: ControlEstanteriaComponent
    },
    {
        path     : ':modo/:id',
        component: ControlarLoteComponent
    }, 
];

@NgModule({
    declarations: [
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
        TablaRetractilModule
    ],
    providers   : [
        ControlBusquedaService,
        ControlarLoteService
    ]
})

export class ControlModule
{
}