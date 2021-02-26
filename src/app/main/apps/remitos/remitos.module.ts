import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';

//components
import { RemitosComponent } from './remitos/remitos.component';
import { ListaRemitosComponent } from './lista-remitos/lista-remitos.component';
import { VerRemitoComponent } from './lista-remitos/ver-remito/ver-remito.component';
import { RemitosConfirmarComponent } from './remitos-confirmar/remitos-confirmar.component';

//services
import { RemitoService } from './remitos/remitos.service';
import { RemitosConfirmarService } from './remitos-confirmar/remitos-confirmar.service';
import { ListaRemitosService } from './lista-remitos/lista-remitos.service';
import { VerRemitoService } from './lista-remitos/ver-remito/ver-remito.service';

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
        VerRemitoComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),
        MaterialDesignModule,

        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule
        
    ],
    providers   : [
        RemitoService,
        RemitosConfirmarService,
        ListaRemitosService,
        VerRemitoService
    ]
})
export class RemitosModule
{
}