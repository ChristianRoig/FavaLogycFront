import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators   } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { config } from 'environments/config_system';
import { CookieService } from 'ngx-cookie-service';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

import { ModalRecuperarContrasenaComponent } from './modal-recuperar-contrasena/modal-recuperar-contrasena.component';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { SonidoService } from 'app/shared/services/sonidos.service';
import { LoginService } from './login.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';


const user: string = config.Cookie_User;
const token: string = config.Cookie_Token;
const expirar: string = config.Cookie_expirar;
const sesion_activa: number = config.sesion_activa; // Minutos

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

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorLog = false;
    error = false;
    info: any;
    rol: string[] = [];

    infoOnChanged: BehaviorSubject<any>;
    perfilLogOnChanged: BehaviorSubject<any>;
    rolOnChanged: BehaviorSubject<any>;

    // Private
    protected _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router, 
        private _dialog: MatDialog,
        private _serviceSonido: SonidoService,
        private _loginService: LoginService,
        private _cookieService: CookieService,
        private _fuseNavigationService: FuseNavigationService
    )
    {

        this.infoOnChanged = new BehaviorSubject([]);
        this.perfilLogOnChanged = new BehaviorSubject([]);
        this.rolOnChanged = new BehaviorSubject([]);
        
        const userLog = this._cookieService.get(user); 
        //console.log("- userLog | ", userLog);
        /* // chequear la compatibilidad del servidor.... incorporar ErrorService
        if (!this._errorService.isBrowserCompatible()) {
            this._router.navigate(['/error']); 
        } 
        */
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.loginForm = this._formBuilder.group({
            email   : ['', Validators.required],
            password: ['', Validators.required]
            /* email   : [''],
            password: [''] */
        });

        this._loginService.infoOnChanged
            .pipe(takeUntil (this._unsubscribeAll ))
            .subscribe(info => {                
                if (info){
                    this.info = info;                    
                    if (info === 'error'){
                        console.log('error sistema');
                        this.error = true; // Error Sistema
                    }
                } else { // null
                    console.log('error log');                                        
                    this.errorLog = true;
                }
            });
    }

    recuperarContrasena() {                    // NO SE USA
        const dialogRef = this._dialog.open(ModalRecuperarContrasenaComponent);
    
        dialogRef.afterClosed().subscribe(result => {
            this._serviceSonido.playAudioAlert();
        });
    }

    logIn(){
        let email:    string  = this.loginForm.get('email').value;
        let password: string  = this.loginForm.get('password').value;

        this.logout();
        
        this._loginService._obtenerLogin( email, password ).subscribe((info: ResponseLogin) => { 
            console.log("info - obtenerLogin|", info);
            
            if (info.token == null){                // comienzo de logica de GESTIONATE
                this._serviceSonido.playAudioAlert();
                let titulo = 'Fallo al ingresar';
                let mensaje = 'El usuario o la contraseña son incorrectos';
                this.mostrarError(0, titulo, mensaje);
            } 
            else {
                info = new ResponseLogin(info);
                this.definirAccesos(); 
                this._trabajoLogueo( info ); //perf,roles
                this._serviceSonido.playAudioSuccess();
                this._router.navigate(['/inicio'])
                this.infoOnChanged.next(info);
                this._loginService.infoOnChanged.next(info);
            }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error");
          } else {
            let errStatus = err.status
            if (errStatus == 0){
              let titulo = 'Error de Servidor';
              let mensaje = "Por favor comunicarse con Sistemas";
              this.mostrarError(errStatus, titulo, mensaje);
            } else {
              let titulo = 'Fallo al ingresar';
              let mensaje = 'El usuario o la contraseña son incorrectos';
              this.mostrarError(errStatus, titulo, mensaje);
            }
          }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    /**
     * Metodo para cerrar la sesion
     */
    private logout(): void {
        this.infoOnChanged.next(new ResponseLogin({})); // ver de donde sale ResponseLogin
        //this.perfilLogOnChanged.next(new Perfil({}));
        this.rolOnChanged.next([]);

        localStorage.clear();
        //this._cookieService.deleteAll();

        this._router.navigate(['']);
    }
    //--------------------------------------------------------------------------------------------------

    definirAccesos(){
        if(this.isAdmin()){

            this._fuseNavigationService.updateNavigationItem('pedidos', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('lotes', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('control', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('remitos', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('distribucion', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('carga', {
                hidden: true
            });
        }
    }

    //--------------------------------------------------------------------------------------------------
    /**
     * setea en caso de error
     */
    private _defineError(): void {
        this.rol = [];
        this.info = 'error';
        //this.perfilLog = new Perfil({});
        
        this.rolOnChanged.next(this.rol);
        this.infoOnChanged.next(this.info);
        //this.perfilLogOnChanged.next(this.perfilLog);
    }

    //--------------------------------------------------------------------------------------------------
    //, perf: Perfil, , roles: [] |  parametro que estaba y yo saqué O
    private _trabajoLogueo(info: ResponseLogin): void {        
        let expirarDate = new Date();
        //console.log("llego hasta trabajoLogueo");
        expirarDate.setMinutes(expirarDate.getMinutes() + sesion_activa);
        
        this.info = info;
        //this.rol = roles;
        //this.perfilLog = new Perfil(perf);
        
        //perf.novedadesExternas = null; // fix para que pueda setear la cookie, puede supepar el tamaño maximo cuando se transforma a JSON
        //perf.novedadesPorEquipo = null; // fix para que pueda setear la cookie, puede supepar el tamaño maximo cuando se transforma a JSON
        
        let dataCookie: DataCookie = {
            expirar: expirarDate,
            infoToken: info.token,
            //user: JSON.stringify(perf),
        };
        
        this.handlerCookies(dataCookie);
        
        this.rolOnChanged.next(this.rol);
        this.infoOnChanged.next(this.info);
        //this.perfilLogOnChanged.next(this.perfilLog);
        
        //this._router.navigate(['/inicio']);
    }

    // -----------------------------------------------------------------------------------------------------
    
    public isAdmin(): boolean{
        console.log("this.info.username", this.info.username);
        if (this.info.username === "burroni.santiago" || this.info.username === "jacobo.pablo" ){
            return true;
        } else {
            return false;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    /**
     * se encarga de setear las cookies o de extender las mas importantes si es el caso
     * para extender las cookies solamente NO hay que enviar la data
     * @param {DataCookie} data 
     */
    private handlerCookies(data?: DataCookie): void {
        console.log("token + tiempo sesion",{data});
        //console.log("TOKEN",token);
        if (data){
            console.log("primer SET |", token, "|",data.infoToken, "|",data.expirar);
            

            localStorage.setItem(token, data.infoToken);
            console.log(localStorage.getItem(token));
            
            
            /* this._cookieService.set(token, data.infoToken, data.expirar); 
            this._cookieService.set(user, data.user, data.expirar);
            this._cookieService.set(expirar, data.expirar.toUTCString(), data.expirar ); */
        } 
        /* else { 
            let e = new Date();
            e.setMinutes(e.getMinutes() + sesion_activa);
            
            console.log('Se extiende la sesion ' + sesion_activa);
            
            data = {
                expirar: e,
                infoToken: this._cookieService.get(token),
                user: this._cookieService.get(user),
            };
            
            // console.log({data});
            this._cookieService.set(token, data.infoToken, data.expirar);
            this._cookieService.set(user, data.user, data.expirar);
            this._cookieService.set(expirar, data.expirar.toUTCString(), data.expirar );
        }*/

    }
    //--------------------------------------------------------------------------------------------------
    /**
     * Determina si los datos de log estan disponibles            // YA ESTA EN EL COMPONENT
     */
    isSetLog(): boolean {
        const userLog = this._cookieService.get(user);
        const tokenLog = this._cookieService.get(token);
        console.log("userLog",userLog, "tokenLog", tokenLog);
        if ((userLog) && (tokenLog)) {
            return true;
        } else {
            this.logout();
            return false;
        }    
    }
    //--------------------------------------------------------------------------------------------------
        
    private mostrarError(errStatus, titulo, mensaje){
        const dialogRef = this._dialog.open( ModalErrorComponent, { 
          data: {
            titulo: titulo,
            mensaje: mensaje
          } 
        });
    }
}