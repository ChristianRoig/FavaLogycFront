import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpClientModule } from '@angular/common/http';

const routes = [
    {
        path        : 'pedidos',
        loadChildren: () => import('./pedidos-a-trabajar/pedidos.module').then(m => m.PedidosModule)
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
        path        : 'control',
        loadChildren: () => import('./control/control.module').then(m => m.ControlModule)
    },
    {
        path        : 'articulos',
        loadChildren: () => import('./articulos/articulos.module').then(m => m.ArticulosModule)
    }
    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        HttpClientModule
    ]
})
export class AppsModule
{
}
