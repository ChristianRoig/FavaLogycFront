import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio'
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
import { ControlDeCargaComponent } from './control-de-carga/control-de-carga.component';
import { ControlarCargaComponent } from './controlar-orden/controlar-orden.component';
import { PopUpOrdenControladaComponent } from './controlar-orden/popUpOrdenControlada/popUpOrdenControlada.component';
import { ControlDeCargaService } from './control-de-carga/control-de-carga.service';
import { ControlarOrdenService } from './controlar-orden/controlar-orden.service';


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
        path     : 'control-de-carga',
        component: ControlDeCargaComponent
    },
    {
        path     : 'controlar-orden/:id',
        component: ControlarCargaComponent
    }, 
];

@NgModule({
    declarations: [
        CrearOrdenDistribucionComponent,
        OrdenesDistribucionComponent,
        VerOrdenDistribucionComponent,
        ConfirmarOrdenDeDistribucionComponent,
        ControlDeCargaComponent,
        ControlarCargaComponent,
        PopUpOrdenControladaComponent
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
        PdfViewerModule,
        MatRadioModule
    ],
    providers   : [
        CrearOrdenDistribucionService,
        OrdenesDistribucionService,
        VerOrdenDistribucionService,
        ConfirmarOrdenDeDistribucionService,
        ControlDeCargaService,
        ControlarOrdenService
    ],
    entryComponents: [ MatDialogModule ]
})

export class DistribucionModule
{
}