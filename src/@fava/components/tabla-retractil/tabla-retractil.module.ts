import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '@material/material-design.module';
//import { MatTableModule } from '@angular/material/table';

import { TablaRetractilComponent } from './tabla-retractil.component';


@NgModule({
  declarations: [TablaRetractilComponent],
  imports: [
    CommonModule,
    //MatTableModule,
    MaterialDesignModule
  ],
  exports: [TablaRetractilComponent]
})
export class TablaRetractilModule { }
