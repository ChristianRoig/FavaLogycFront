import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSidebarModule } from '@fuse/components';

//fava
import { MaterialDesignModule } from '@material/material-design.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';

//components
import { CrearOrdenDistribucionComponent } from './crear-orden-distribucion/crear-orden-distribucion.component';
import { OrdenesDistribucionComponent } from './ordenes-distribucion/ordenes-distribucion.component';
import { VerOrdenDistribucionComponent } from './ordenes-distribucion/ver-orden-distribucion/ver-orden-distribucion.component';
import { ConfirmarOrdenDeDistribucionComponent } from './crear-orden-distribucion/confirmar-ordenDist/confirmar-ordenDist.component';

//services
import { CrearOrdenDistribucionService } from './crear-orden-distribucion/crear-orden-distribucion.service';
import { OrdenesDistribucionService } from './ordenes-distribucion/ordenes-distribucion.service';
import { VerOrdenDistribucionService } from './ordenes-distribucion/ver-orden-distribucion/ver-orden-distribucion.service';
import { ConfirmarOrdenDeDistribucionService } from './crear-orden-distribucion/confirmar-ordenDist/confirmar-ordenDist.service';


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
    }
];

@NgModule({
    declarations: [
        CrearOrdenDistribucionComponent,
        OrdenesDistribucionComponent,
        VerOrdenDistribucionComponent,
        ConfirmarOrdenDeDistribucionComponent
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
        CrearOrdenDistribucionService,
        OrdenesDistribucionService,
        VerOrdenDistribucionService,
        ConfirmarOrdenDeDistribucionService
    ],
    entryComponents: [ MatDialogModule ]
})

export class DistribucionModule
{
}