export class DATOS_ENTREGA {
    id: number;
    fechaDeEntrega: string;
    pedidoTurno: PedidoTurno;
    direccion: string;
    sysLocalidad: SysLocalidad;
    sysTransporte: PedidoTurno;
    telefono: string;
    mail?: any;
    contacto?: any;
    observaciones?: any;
    
    listaPedidoDetalle: LISTA_PEDIDOS[];
}

export class LISTA_PEDIDOS {
    id: number;
    tipoCbte: string;
    numeroCbte: string;
    codigoCliente: string;
    nombreCliente: string;
    codigoArticulo: string;
    codigoDeBarras: string;
    nombreArticulo: string;
}

/**
 * Automatico, lo recibo del GET
 */
export interface RootObject {
  totalRegistros: number;
  datos: Dato[];
}

interface Dato {
  id?: number;
  fechaDeEntrega?: string;
  pedidoTurno?: PedidoTurno;
  direccion?: string;
  sysLocalidad?: SysLocalidad;
  sysTransporte?: PedidoTurno;
  telefono?: string;
  mail?: any;
  contacto?: any;
  observaciones?: any;
  listaPedidoDetalle?: ListaPedidoDetalle[];
}

interface ListaPedidoDetalle {
  id: number;
  pedidoCabecera: PedidoCabecera;
  articulo: Articulo;
  pedidoLote?: PedidoTurno;
}

interface Articulo {
  id: number;
  codigoArticulo: string;
  nombre: string;
  descripcion: string;
  observaciones?: any;
}

interface PedidoCabecera {
  id: number;
  pedidoCbte: PedidoCbte;
  pedidoTipo: PedidoTurno;
  pedidoCliente: PedidoCliente;
}

interface PedidoCliente {
  id: number;
  codigo: string;
  nombre: string;
}

interface PedidoCbte {
  id: number;
  pedidoTipoCbte: PedidoTipoCbte;
  nroCbte: string;
  fechaCbte: string;
}

interface PedidoTipoCbte {
  id: number;
  codigoCbte: string;
  nombre: string;
}

interface SysLocalidad {
  id: number;
  sysProvincia: PedidoTurno;
  nombre: string;
  codigoPostal: string;
}

interface PedidoTurno {
  id: number;
  nombre: string;
}

