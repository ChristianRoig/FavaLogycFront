import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpClientModule } from '@angular/common/http';

const routes = [
    {
        path        : 'pedidos',
        loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule)
    },
    {
        path        : 'remitos',
        loadChildren: () => import('./remitos/remitos.module').then(m => m.RemitosModule)
    },
    {
        path        : 'lotes',
        loadChildren: () => import('./lotes/lotes.module').then(m => m.LotesModule)
    },
    {
        path        : 'control/lote-en',
        loadChildren: () => import('./control/control.module').then(m => m.ControlModule)
    },
    {
        path        : 'articulos',
        loadChildren: () => import('./articulos/articulos.module').then(m => m.ArticulosModule)
    },
    {
        path        : 'comprobantes',
        loadChildren: () => import('./comprobantes/comprobantes.module').then(m => m.ComprobantesModule)
    },
    {
        path        : 'distribucion',
        loadChildren: () => import('./distribucion/distribucion.module').then(m => m.DistribucionModule)
    },
    {
        path        : 'envios',
        loadChildren: () => import('./envios/envios.module').then(m => m.EnviosModule)
    }
    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        HttpClientModule
    ],
    entryComponents:[ MatDialogModule ]
})
export class AppsModule
{
}
