import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { MatTableModule } from '@angular/material/table';
import { MaterialDesignModule } from 'app/material-design/material-design.module';

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
