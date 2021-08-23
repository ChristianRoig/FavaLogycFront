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
import { RemitosComponent } from './crear-remito/crear-remito.component';
import { ListaRemitosComponent } from './lista-remitos/lista-remitos.component';
import { VerRemitoComponent } from './lista-remitos/ver-remito/ver-remito.component';
import { ConfirmarRemitoComponent } from './crear-remito/confirmar-remito/confirmar-remito.component';

//services
import { RemitoService } from './crear-remito/crear-remito.service';
import { ListaRemitosService } from './lista-remitos/lista-remitos.service';
import { VerRemitoService } from './lista-remitos/ver-remito/ver-remito.service';
import { ConfirmarRemitoService } from './crear-remito/confirmar-remito/confirmar-remito.service';

const routes: Routes = [
    {
        path     : 'crear-remito',
        component: RemitosComponent
    },
    {
        path     : 'lista-remitos',
        component: ListaRemitosComponent
    },
    {
        path     : 'ver-remito/:id',
        component: VerRemitoComponent
    }
];

@NgModule({
    declarations: [
        RemitosComponent,
        ConfirmarRemitoComponent,
        ListaRemitosComponent,
        VerRemitoComponent
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
        RemitoService,
        ConfirmarRemitoService,
        ListaRemitosService,
        VerRemitoService
    ],
    entryComponents:[ MatDialogModule ]
})
export class RemitosModule
{
}