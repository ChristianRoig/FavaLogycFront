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
import { RemitosComponent } from './crear-remito/crear-remito.component';
import { ListaRemitosComponent } from './lista-remitos/lista-remitos.component';
import { VerRemitoComponent } from './lista-remitos/ver-remito/ver-remito.component';
import { RemitosConfirmarComponent } from './remitos-confirmar/remitos-confirmar.component';
import { ConfirmarRemitoComponent } from './crear-remito/confirmar-remito/confirmar-remito.component';

//services
import { RemitoService } from './crear-remito/crear-remito.service';
import { RemitosConfirmarService } from './remitos-confirmar/remitos-confirmar.service';
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
    },
    {
        path     : 'remitos-conf',
        component: RemitosConfirmarComponent //borrar
    },
    {
        path     : 'confirmar-remito',
        component: ConfirmarRemitoComponent // este va
    } 
];

@NgModule({
    declarations: [
        RemitosComponent,
        RemitosConfirmarComponent,//borrar
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
        CustomTagModule
    ],
    providers   : [
        RemitoService,
        RemitosConfirmarService,// borrar
        ConfirmarRemitoService,
        ListaRemitosService,
        VerRemitoService
    ],
    entryComponents:[ MatDialogModule ]
})
export class RemitosModule
{
}