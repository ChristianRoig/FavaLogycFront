import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { ModalErrorComponent } from './modal-error/modal-error.component';



@NgModule({
    declarations: [
        ModalErrorComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,
        MaterialDesignModule,
        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule
    ],
    providers   : [
    ]
})
export class SharedModule
{
}