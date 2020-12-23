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
import { ControlEstanteriaComponent } from '../control/control-estanteria/control-estanteria.component';
import { ControlEstanteriaBusquedaComponent } from '../control/control-estanteria-busqueda/control-estanteria-busqueda.component';

// servicios favalogyc
import { ControlEstanteriaService } from '../control/control-estanteria/control-estanteria.service';
import { ControlEstanteriaBusquedaService } from '../control/control-estanteria-busqueda/control-estanteria-busqueda.service';

const routes: Routes = [
    {
        path     : ':modo',
        component: ControlEstanteriaComponent
    },
    {
        path     : ':modo/busqueda',
        component: ControlEstanteriaBusquedaComponent
    }
];

@NgModule({
    declarations: [
        ControlEstanteriaComponent,
        ControlEstanteriaBusquedaComponent
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
        ControlEstanteriaService,
        ControlEstanteriaBusquedaService
    ]
})

export class ControlModule
{
}