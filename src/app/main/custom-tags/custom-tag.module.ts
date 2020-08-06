import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaFondoComponent } from './plantilla-fondo/plantilla-fondo.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { PlantillaFondoSimpleComponent } from './plantilla-fondo-simple/plantilla-fondo-simple.component';
import { MaterialDesignModule } from 'app/material-design/material-design.module';



@NgModule({
  declarations: [
    PlantillaFondoComponent,
    PlantillaFondoSimpleComponent
  ],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseWidgetModule,
    MaterialDesignModule
  ],
  exports: [
    PlantillaFondoComponent,
    PlantillaFondoSimpleComponent
  ]
})
export class CustomTagModule { }
