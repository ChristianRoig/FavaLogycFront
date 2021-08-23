import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

//fava
import { MaterialDesignModule } from '@material/material-design.module';
import { CustomTagModule } from './custom-tags/custom-tag.module';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { SharedService } from './services/shared.service';


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
        SharedService
    ]
})
export class SharedModule
{
}