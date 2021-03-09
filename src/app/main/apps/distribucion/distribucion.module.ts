import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { MatDialogModule } from '@angular/material/dialog';

//fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

//components
import { CrearOrdenDistribucionComponent } from './crear-orden-distribucion/crear-orden-distribucion.component';
import { OrdenesDistribucionComponent } from './ordenes-distribucion/ordenes-distribucion.component';
import { VerOrdenDistribucionComponent } from './ordenes-distribucion/ver-orden-distribucion/ver-orden-distribucion.component';
import { DistribucionConfirmarComponent } from './distribucion-confirmar/distribucion-confirmar.component';

//services
import { CrearOrdenDistribucionService } from './crear-orden-distribucion/crear-orden-distribucion.service';
import { DistribucionConfirmarService } from './distribucion-confirmar/distribucion-confirmar.service';
import { OrdenesDistribucionService } from './ordenes-distribucion/ordenes-distribucion.service';
import { VerOrdenDistribucionService } from './ordenes-distribucion/ver-orden-distribucion/ver-orden-distribucion.service';


const routes: Routes = [
    {
        path     : 'crear-orden-distribucion',
        component: CrearOrdenDistribucionComponent
    },
    {
        path     : 'ordenes-distribucion',
        component: OrdenesDistribucionComponent
    },
    {
        path     : 'ver-orden-distribucion/:id',
        component: VerOrdenDistribucionComponent
    },
    {
        path     : 'orden-distribucion-conf',
        component: DistribucionConfirmarComponent
    }
];

@NgModule({
    declarations: [
        CrearOrdenDistribucionComponent,
        DistribucionConfirmarComponent,
        OrdenesDistribucionComponent,
        VerOrdenDistribucionComponent
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
        CrearOrdenDistribucionService,
        DistribucionConfirmarService,
        OrdenesDistribucionService,
        VerOrdenDistribucionService
    ],
    entryComponents: [ MatDialogModule ]
})

export class DistribucionModule
{
}