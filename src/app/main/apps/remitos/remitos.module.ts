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
import { RemitosComponent } from './remitos/remitos.component';
import { ListaRemitosComponent } from './lista-remitos/lista-remitos.component';
import { VerRemitoComponent } from './lista-remitos/ver-remito/ver-remito.component';
import { RemitosConfirmarComponent } from './remitos-confirmar/remitos-confirmar.component';
import { VerImpresorasComponent } from './lista-remitos/ver-impresoras/ver-impresoras.component';
import { VerCupasComponent } from './lista-remitos/ver-cupas/ver-cupas.component';


//services
import { RemitoService } from './remitos/remitos.service';
import { RemitosConfirmarService } from './remitos-confirmar/remitos-confirmar.service';
import { ListaRemitosService } from './lista-remitos/lista-remitos.service';
import { VerRemitoService } from './lista-remitos/ver-remito/ver-remito.service';
import { VerImpresorasService } from './lista-remitos/ver-impresoras/ver-impresoras.service';
import { VerCupasService } from './lista-remitos/ver-cupas/ver-cupas.service';


const routes: Routes = [
    {
        path     : 'crear-remitos',
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
        component: RemitosConfirmarComponent
    }
];

@NgModule({
    declarations: [
        RemitosComponent,
        RemitosConfirmarComponent,
        ListaRemitosComponent,
        VerRemitoComponent,
        VerCupasComponent,
        VerImpresorasComponent
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
        RemitosConfirmarService,
        ListaRemitosService,
        VerRemitoService,
        VerImpresorasService,
        VerCupasService
    ],
    entryComponents:[ MatDialogModule ]
})
export class RemitosModule
{
}