import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaFondoComponent } from './plantilla-fondo/plantilla-fondo.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';



@NgModule({
  declarations: [
    PlantillaFondoComponent
  ],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseWidgetModule,
  ],
  exports: [
    PlantillaFondoComponent
  ]
})
export class CustomTagModule { }
