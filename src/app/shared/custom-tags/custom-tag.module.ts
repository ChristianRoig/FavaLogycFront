import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { MaterialDesignModule } from '@material/material-design.module';

import { PlantillaFondoComponent } from './plantilla-fondo/plantilla-fondo.component';
import { PlantillaFondoSimpleComponent } from './plantilla-fondo-simple/plantilla-fondo-simple.component';


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
