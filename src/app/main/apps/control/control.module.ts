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

// modulos favalogyc
import { TablaRetractilModule } from 'app/components/tabla-retractil/tabla-retractil.module';

// componentes favalogyc
import { ControlEstanteriaComponent } from './control-busqueda/control-busqueda.component';
import { ControlarLoteComponent } from './controlar-lote/controlar-lote.component';

// servicios favalogyc
import { ControlBusquedaService } from './control-busqueda/control-busqueda.service';
import { ControlEstanteriaBusquedaService } from '../control/controlar-lote/controlar-lote.service';

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
        ControlarLoteComponent
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
        ControlEstanteriaBusquedaService
    ]
})

export class ControlModule
{
}