import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'environments/environment';
//import { Perfil } from 'app/main/perfil/perfil.model';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { config } from 'environments/config_system'; 
import { Router } from '@angular/router';

const API_LOG: string = environment.api_log;

const user: string = "user";
const token: string = "token";
const expirar: string = "expirar";
const sesion_activa: number = 60; // Minutos

export interface DataCookie {
    infoToken?: string;
    expirar?: Date;
    user?: string;
}

export class ResponseLogin {
    username: string;        
    token: string;

    // colaborador: Perfil;

    /**
    * Constructor
    * @param responseLogin
    */
    constructor( responseLogin ){
        this.token = responseLogin.token || null;        
        this.username = responseLogin.username || null;
    }
}

@Injectable()
export class LoginService {

    private info: any;
    private token: string;

    infoOnChanged: BehaviorSubject<any>;
    rolOnChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {CookieService} _cookieService
     * @param {Router} _router
     */
    constructor( 
        private _httpClient: HttpClient, 
        private _router: Router,
        private _fuseNavigationService: FuseNavigationService
    ){
        // Set the defaults
        
        this.infoOnChanged = new BehaviorSubject([]);
        this.rolOnChanged = new BehaviorSubject([]);
        
        const userLog = localStorage.getItem("username");        

        this.rolOnChanged.next([]);
    }

    //--------------------------------------------------------------------------------------------------
    /** Crea el llamado al servicio back de login
     * 
     * @param {string} username
     * @param {string} password        // devuelve un token y un userName
     */
    _obtenerLogin(username: string, password: string): Observable<any> | any {
        
        //console.log("Obtener login");
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'            
        });
        
        const options = { headers: httpHeaders };
        
        const params = {
            'username': username,
            'password': password
        };
        
        this.info = this._httpClient.post(API_LOG, params, options);
        return this.info;
    }

    //--------------------------------------------------------------------------------------------------

    logout(): void {
        localStorage.clear();
        window.location.reload();
    }

    //--------------------------------------------------------------------------------------------------

    hideByRol(rolesSINUSO: string[]): void {

        let roles: string[] = [];
        roles.push(localStorage.getItem("rol"));
        
        if (roles.includes("comun") || roles == null || roles.length == 0){
            this._fuseNavigationService.updateNavigationItem('lotes',   { hidden: true });          
            this._fuseNavigationService.updateNavigationItem('control', { hidden: true });          
            this._fuseNavigationService.updateNavigationItem('remitos', { hidden: true });          
            this._fuseNavigationService.updateNavigationItem('distribucion', { hidden: true });          
            this._fuseNavigationService.updateNavigationItem('carga', { hidden: true });          
            this._fuseNavigationService.updateNavigationItem('infoAuxiliar', { hidden: true });           
        } else if (roles.includes("cedis") ){
            this._fuseNavigationService.updateNavigationItem('lotes',   { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('control', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('remitos', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('distribucion', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('carga', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('infoAuxiliar', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('desarrollo', { hidden: true });          
        } else if (roles.includes("admin") ){
            this._fuseNavigationService.updateNavigationItem('lotes',   { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('control', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('remitos', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('distribucion', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('carga', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('infoAuxiliar', { hidden: false });          
            this._fuseNavigationService.updateNavigationItem('desarrollo', { hidden: false });           
        }
}

}