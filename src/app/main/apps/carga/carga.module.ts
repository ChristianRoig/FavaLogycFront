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
import { ControlCargasComponent } from './control-cargas/control-cargas.component';
import { ControlarCargaComponent } from './controlar-carga/controlar-carga.component';

// servicios favalogyc
import { ControlCargasService } from './control-cargas/control-cargas.service';
import { ControlCargaService } from './controlar-carga/controlar-carga.service';

const routes: Routes = [
    {
        path     : ':modo',
        component: ControlCargasComponent
    },
    {
        path     : ':modo/:id',
        component: ControlarCargaComponent
    }, 
];

@NgModule({
    declarations: [
        ControlCargasComponent,
        ControlarCargaComponent
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
        ControlCargasService,
        ControlCargaService
    ]
})

export class CargaModule
{
}