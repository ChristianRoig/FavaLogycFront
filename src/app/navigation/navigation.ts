import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'Menú Principal',
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
                        id        : 'pedidos-lista',
                        title     : 'Administración Pedidos',
                        type      : 'item',
                        url       : '/apps/pedidos/administracion/pedidos-lista',
                        exactMatch: true
                    },
                    {
                        id        : 'Lotes',
                        title     : 'Trabajar con Lotes',
                        type      : 'collapsable',
                        children : [ 
                            {
                                id        : 'crearLote',
                                title     : 'Crear Lote',
                                type      : 'item',
                                url       : '/apps/pedidos/administracion/crear-lote',
                                exactMatch: true
                            },
                            {
                                id        : 'admLote',
                                title     : 'Administrar Lotes',
                                type      : 'item',
                                url       : '/apps/pedidos/administracion/administrar-lote',
                                exactMatch: true
                            }
                        ]
                    },
                    {
                        id        : 'partes-articulo',
                        title     : 'Partes de artículo',
                        type      : 'item',
                        url       : '/apps/pedidos/partes-articulo',
                        exactMatch: true
                    },
                    {
                        id        : 'codigos-barra',
                        title     : 'Códigos de Barra',
                        type      : 'item',
                        url       : '/apps/pedidos/codigos-barra-articulos',
                        exactMatch: true
                    }
                ]
            }
        ]
    }
];