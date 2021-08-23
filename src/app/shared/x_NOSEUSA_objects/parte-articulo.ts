export class ParteArticulo {
    id: number;
    articulo: {
        id: number;
        codigoArticulo: string;
        nombre: string;
        descripcion: string;
        observaciones: string;
        sysUsuario: {
            id: 1;
            nombre: string;
            descripcion: string;
            usuarioActiveDirectory:string;
            usuarioGAM: string;
            usuarioAltaid: number;
            fechaAlta: number;
        },
        fechaAlta: number;
    };
    cantidad: number;
    sysUsuario: {
        id: 1;
        nombre: string;
        descripcion: string;
        usuarioActiveDirectory:string;
        usuarioGAM: string;
        usuarioAltaid: number;
        fechaAlta: number;
    };
    fechaAlta: number;
}