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
import { CustomTagModule } from 'app/shared/custom-tags/custom-tag.module';

//components
import { ComprobantesAprogramarComponent } from './comprobantes-a-programar.component';

//services
import { ComprobantesAprogramarService } from './comprobantes-a-programar.service';

const routes: Routes = [

    {
        path     : '',
        component: ComprobantesAprogramarComponent
    }
];

@NgModule({
    declarations: [
        ComprobantesAprogramarComponent,
    ],
    imports     : [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FuseSidebarModule,
        FuseSharedModule,
        FuseWidgetModule,
        MaterialDesignModule,
        CustomTagModule
    ],
    providers   : [
        ComprobantesAprogramarService
    ]
})

export class EmpaqueModule
{
}