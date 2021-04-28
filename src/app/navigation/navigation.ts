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
                id       : 'inicio',
                title    : 'Inicio',
                type     : 'item',
                url       : '/apps',
                icon     : 'home',
                exactMatch: true
            },
            {
                id       : 'pedidos',
                title    : 'Pedidos',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    
                    {
                        id       : 'comprobantes',
                        title    : 'Comprobantes',
                        type     : 'item',
                        url       : '/apps/pedidos/lista-comprobantes',
                        exactMatch: true
                        
                    },
                    {
                        id        : 'crear-pedido',
                        title     : 'Crear Pedido',
                        type      : 'item',
                        url       : '/apps/pedidos/crear-pedido',
                        exactMatch: true
                    },
                    {
                        id        : 'lista-articulos',
                        title     : 'Pedidos (viejo)',
                        type      : 'item',
                        url       : '/apps/pedidos/lista-articulos',
                        exactMatch: true
                    }
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
                        id        : 'crearLote',
                        title     : 'Crear Lote',
                        type      : 'item',
                        url       : '/apps/lotes/crear-lote',
                        exactMatch: true
                    },
                    {
                        id        : 'listaLotes',
                        title     : 'Lotes',
                        type      : 'item',
                        url       : '/apps/lotes/lista-lotes',
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
                type      : 'collapsable',
                icon      : 'insert_drive_file',
                exactMatch: true,
                children : [ 
                    {
                        id        : 'remitos',
                        title     : 'Crear Remito',
                        type      : 'item',
                        url       : '/apps/remitos/crear-remito',
                        exactMatch: true
                    },
                    {
                        id        : 'remitos',
                        title     : 'Remitos',
                        type      : 'item',
                        url       : '/apps/remitos/lista-remitos',
                        exactMatch: true
                    }
                ]
            },
            ////////////////////////////////////// 
           /*  {
                id        : 'remitos',
                title     : 'Crear Remitos',
                type      : 'item',
                icon      : 'insert_drive_file',
                url       : '/apps/remitos/remitos',
                exactMatch: true
            }, */
            ////////////////////////////////////// 
            
            {
                id       : 'distribucion',
                title    : 'Distribucion',
                type     : 'collapsable',
                icon     : 'call_split',
                children : [
                    {
                        id        : 'crear-orden-distribucion',
                        title     : 'Crear Orden Distribución',
                        type      : 'item',
                        url       : '/apps/distribucion/crear-orden-distribucion',
                        exactMatch: true
                    },
                    {
                        id        : 'ordenes-distribucion',
                        title     : 'Ordenes de Distribución',
                        type      : 'item',
                        url       : '/apps/distribucion/ordenes-distribucion',
                        exactMatch: true
                    }
                ]
            },
            {
                id        : 'carga',
                title     : 'Carga',
                type      : 'collapsable',
                icon      : 'add_shopping_cart',
                exactMatch: true,
                children : [
                    {
                        id        : 'control-de-carga',
                        title     : 'Control de Carga',
                        type      : 'item',
                        url       : '/apps/carga/control-de-carga',
                        exactMatch: true
                    }
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
                id       : 'articulos',
                title    : 'Articulos',
                type     : 'collapsable',
                icon     : 'dashboard',
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
            {
                id       : 'beta and legacy',
                title    : 'Beta and Legacy',
                type     : 'collapsable',
                children : [
                    {
                        id        : 'lista-articulos',
                        title     : 'Pedidos (viejo)',
                        type      : 'item',
                        url       : '/apps/pedidos/lista-articulos',
                        exactMatch: true
                    }
                ]
            }
        ]
    }
];