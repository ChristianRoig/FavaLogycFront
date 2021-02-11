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
                title    : 'Pedidos',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'lista-articulos',
                        title     : 'Lista Pedidos',
                        type      : 'item',
                        url       : '/apps/pedidos/lista-articulos',
                        exactMatch: true
                    },
                    {
                        id        : 'ver-pedido',
                        title     : 'Ver Pedidos',
                        type      : 'item',
                        url       : '/apps/pedidos/ver-pedido/7',
                        exactMatch: true
                    },
                    {
                        id        : 'crear-pedido',
                        title     : 'Crear Pedido',
                        type      : 'item',
                        url       : '/apps/pedidos/crear-pedido',
                        exactMatch: true
                    },
                ]
            },
            {
                id        : 'lotes',
                title     : 'Lotes',
                type      : 'collapsable',
                icon      : 'apps',
                exactMatch: true,
                children : [ 
                    {
                        id        : 'listaLotes',
                        title     : 'Lotes',
                        type      : 'item',
                        url       : '/apps/lotes/lista-lotes',
                        exactMatch: true
                    },
                    {
                        id        : 'verLote',
                        title     : 'Ver Lote',
                        type      : 'item',
                        url       : '/apps/lotes/ver-lote/61',
                        exactMatch: true
                    },
                    {
                        id        : 'crearLote',
                        title     : 'Crear Lote',
                        type      : 'item',
                        url       : '/apps/lotes/crear-lote',
                        exactMatch: true
                    }
                ]
            },
            {
                id        : 'control',
                title     : 'Control',
                type      : 'collapsable',
                icon      : 'assignment',
                exactMatch: true,
                children : [ 
                    {
                        id        : 'control',
                        title     : 'Control Estanteria',
                        type      : 'item',
                        url       : '/apps/control/lote-en/estanteria',
                        exactMatch: true
                    },
                    {
                        id        : 'control',
                        title     : 'Control Darsena',
                        type      : 'item',
                        url       : '/apps/control/lote-en/darsena',
                        exactMatch: true
                    }
                ]
            }, 
            {
                id        : 'remitos',
                title     : 'Remitos',
                type      : 'item',
                icon      : 'insert_drive_file',
                url       : '/apps/remitos/remitos',
                exactMatch: true
            },
            {
                id       : 'articulos',
                title    : 'Articulos',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'partes-articulo',
                        title     : 'Partes de artículo',
                        type      : 'item',
                        url       : '/apps/articulos/partes-articulo',
                        exactMatch: true
                    },
                    {
                        id        : 'codigos-barra',
                        title     : 'Códigos de Barras',
                        type      : 'item',
                        url       : '/apps/articulos/codigos-barra-articulos',
                        exactMatch: true
                    },
                ]
            },
        ]
    },
    //-------------------------------------------------------------------------------------
   
    {
        id       : 'infoAuxiliar',
        title    : 'Info Auxiliar',
        translate: 'Info Auxiliar',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Articulos',
                translate: 'Articulos',
                type     : 'collapsable',
                icon     : 'dashboard',
                
            },
            {
                id       : 'dashboards',
                title    : 'Comprobantes',
                type     : 'item',
                url       : '/apps/comprobantes/lista-comprobantes',
                icon     : 'school',
                
            }
        ]
    }
];