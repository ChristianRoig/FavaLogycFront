import { Injectable } from '@angular/core';


const user: string = "user";
const token: string = "token";
const expirar: string = "expirar";
const sesion_activa: number = 60; // Minutos


@Injectable ({
    providedIn: 'root'
})
 export class AuthStorageService {

    constructor () {}

    public singOut(): void {
        window.localStorage.clear();
    }

    public guardarToken( tokenUser: string ): void {
        
        window.localStorage.removeItem(token);
        window.localStorage.setItem( token, tokenUser );
    }
    
    public guardarUser( userName: string ): void {

        window.localStorage.removeItem(user);
        window.localStorage.setItem( user, userName );
    }

    public guardarRol( rol: string ): void {

        window.localStorage.removeItem("rol");
        window.localStorage.setItem( "rol", rol );
    }
    
    public guardarIdSuc( idSucursal: string ): void {

        window.localStorage.removeItem("idSuc");
        window.localStorage.setItem( "idSuc", idSucursal );
    }

    public guardarNbSuc( nbSucursal: string ): void {

        window.localStorage.removeItem("nbSuc");
        window.localStorage.setItem( "nbSuc", nbSucursal );
    }

    

    public guardarSession( ): void {

        window.localStorage.removeItem(expirar);
        let expirarDate = new Date();
        expirarDate.setMinutes(expirarDate.getMinutes() + sesion_activa);
        window.localStorage.setItem( expirar, expirarDate.toString() );
    }

    public getUser(): any {
        return window.localStorage.getItem( user );
    }

    public getToken(): any {
        return window.localStorage.getItem( token );
    }


 }