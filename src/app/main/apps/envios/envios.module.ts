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
import { ControlEnviosComponent } from './control-envios/control-envios.component';
import { ControlarEnvioComponent } from './controlar-envio/controlar-envio.component';

// servicios favalogyc
import { ControlEnviosService } from './control-envios/control-envios.service';
import { ControlEnvioService } from './controlar-envio/controlar-envio.service';

const routes: Routes = [
    {
        path     : ':modo',
        component: ControlEnviosComponent
    },
    {
        path     : ':modo/:id',
        component: ControlarEnvioComponent
    }, 
];

@NgModule({
    declarations: [
        ControlEnviosComponent,
        ControlarEnvioComponent
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
        ControlEnviosService,
        ControlEnvioService
    ]
})

export class EnviosModule
{
}