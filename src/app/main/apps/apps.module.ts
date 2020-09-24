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
