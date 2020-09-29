import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,  
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,    
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatSlideToggleModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'},
  ]
})
export class MaterialDesignModule { }
