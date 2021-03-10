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
import { ControlDeCargaComponent } from './control-de-carga/control-de-carga.component';
import { ControlarCargaComponent } from './controlar-orden/controlar-orden.component';

// servicios favalogyc
import { ControlDeCargaService } from './control-de-carga/control-de-carga.service';
import { ControlCargaService } from './controlar-orden/controlar-orden.service';

const routes: Routes = [
    {
        path     : ':modo',
        component: ControlDeCargaComponent
    },
    {
        path     : ':modo/:id',
        component: ControlarCargaComponent
    }, 
];

@NgModule({
    declarations: [
        ControlDeCargaComponent,
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
        ControlDeCargaService,
        ControlCargaService
    ]
})

export class CargaModule
{
}