export const config = {
    // Cookies
    Cookie_User      : 'user', // Parametro que guarda el usuario logueado en la Cookie.
    Cookie_Token     : 'token', // Parametro que guarda el token de autentificacion en la Cookie.
    Cookie_FiltroMesEQ : 'EQFecha', // Parametro que guarda la fecha en la Cookie.
    Cookie_FiltroMesEX : 'EXFecha', // Parametro que guarda la fecha en la Cookie.
    Cookie_expirar : 'expirar', // Parametro que guarda el time en el que expira la o las cookies
    
    // Posibles estados de una novedad.
    estado1 : 'A CONFIRMAR',
    estado2 : 'APROBADO',
    //estado3 : 'PENDIENTE',
    //estado4 : 'BAJA',
    //estado5 : 'ELIMINADO', // Si tiene este estado no se podra visualizar en el sistema.
    estado3 : 'APROBADO-OBS',
    estado4 : 'A CORREGIR',
    estado5: 'RECHAZADO',
    // Empresas
    F1 : { CLAVE: 'FH', NOMBRE: 'FAVA HNOS.SA'},
    F2 : { CLAVE: 'FN', NOMBRE: 'FAVANET S.A.'},
    F3 : { CLAVE: 'FC', NOMBRE: 'FAVACARD S.A.'},
    
    // Roles
    r1 : 'rrhh',
    r2 : 'res_equipo',
    r3 : 'res_sector',
    r4 : 'comun',

    // Minutos de Sesion
    sesion_activa : 60,

    // 15 minutos en segundos
    tiempo_inactivo : 900,

    version: 'v0.21.6',
    
};
