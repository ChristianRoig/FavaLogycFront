import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'pedidos',
                title    : 'Pedidos a Trabajar',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'partes-articulo',
                        title     : 'Partes de artículo',
                        type      : 'item',
                        url       : '/apps/pedidos/partes-articulo',
                        exactMatch: true
                    },
                    // {
                    //     id        : 'codigos-barra',
                    //     title     : 'Códigos de Barra',
                    //     type      : 'item',
                    //     // url       : '/apps/pedidos/codigos-barra',
                    //     exactMatch: true
                    // }
                ]
            }
        ]
    }
];