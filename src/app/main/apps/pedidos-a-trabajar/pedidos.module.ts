import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { PedidosPartesArticuloComponent } from './partes-articulo/partes-articulo.component';
import { PedidosPartesArticulosService } from './partes-articulo/partes-articulo.service';
import { PedidosPartesArticuloEditarComponent } from './partes-articulo-editar/partes-articulo-editar.component';
import { PedidosPartesArticulosEditarService } from './partes-articulo-editar/partes-articulo-editar.service';
import { PedidosCodigosBarraComponent } from './codigos-barra/codigos-barra.component';
import { PedidosCodigosBarraEditarComponent } from './codigos-barra-editar/codigos-barra-editar.component';
import { PedidosCodigosBarraAddComponent } from './codigos-barra-add/codigos-barra-add.component';
import { PedidosCodigosBarraEditarService } from './codigos-barra-editar/codigos-barra-editar.service';
import { PedidosCodigosBarraAddService } from './codigos-barra-add/codigos-barra-add.service';
import { PedidosCodigosBarraService } from './codigos-barra/codigos-barra.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PedidosCodigosBarraArticulosComponent } from './codigos-barra-articulos/codigos-barra-articulos.component';
import { PedidosCodigosBarraArticulosService } from './codigos-barra-articulos/codigos-barra-articulos.service';
import { CustomTagModule } from 'app/main/custom-tags/custom-tag.module';
import { MaterialDesignModule } from 'app/material-design/material-design.module';
import { ModalConfirmacionBorrarComponent } from './codigos-barra/modal-confirmacion-borrar/modal-confirmacion-borrar.component';
// import { MaterialDesignModule } from 'app/material-design/material-design.module';

const routes: Routes = [
    {
        path     : 'partes-articulo',
        component: PedidosPartesArticuloComponent
    },
    {
        path     : 'partes-articulo/:id',
        component: PedidosPartesArticuloEditarComponent
    },
    {
        path     : 'codigos-barra/:id',
        component: PedidosCodigosBarraComponent
    },
    {
        path     : 'codigos-barra-articulos',
        component: PedidosCodigosBarraArticulosComponent
    },
    {
        path     : 'codigos-barra/ed/:id',
        component: PedidosCodigosBarraEditarComponent
    },
    {
        path     : 'codigos-barra-add/:codArt',
        component: PedidosCodigosBarraAddComponent
    }
];

@NgModule({
    declarations: [
        PedidosPartesArticuloComponent,
        PedidosPartesArticuloEditarComponent,
        PedidosCodigosBarraComponent,
        PedidosCodigosBarraEditarComponent,
        PedidosCodigosBarraAddComponent,
        PedidosCodigosBarraArticulosComponent,
        ModalConfirmacionBorrarComponent
    ],
    imports     : [
        CommonModule,
        HttpClientModule,

        RouterModule.forChild(routes),

        // MatButtonModule,
        // MatChipsModule,
        // MatExpansionModule,
        // MatFormFieldModule,
        // MatIconModule,
        // MatInputModule,
        // MatPaginatorModule,
        // MatRippleModule,
        // MatSelectModule,
        // MatSortModule,
        // MatSnackBarModule,
        // MatTableModule,
        // MatTabsModule,
        MaterialDesignModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        CustomTagModule
    ],
    providers   : [
        PedidosPartesArticulosService,
        PedidosPartesArticulosEditarService,
        PedidosCodigosBarraAddService,
        PedidosCodigosBarraEditarService,
        PedidosCodigosBarraService,
        PedidosCodigosBarraArticulosService
    ]
})
export class PedidosModule
{
}