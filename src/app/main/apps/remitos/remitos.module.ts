import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';


import { RemitosComponent } from './remitos/remitos.component';
import { RemitosConfirmarComponent } from './remitos-confirmar/remitos-confirmar.component';


import { RemitoService } from './remitos/remitos.service';
import { RemitosConfirmarService } from './remitos-confirmar/remitos-confirmar.service';




const routes: Routes = [
    {
        path     : 'remitos',
        component: RemitosComponent
    },
    {
        path     : 'remitos-conf',
        component: RemitosConfirmarComponent
    }
];

@NgModule({
    declarations: [
        RemitosComponent,
        RemitosConfirmarComponent
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
        RemitosConfirmarService
    ]
})
export class RemitosModule
{
}