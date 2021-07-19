import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators   } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { config } from 'environments/config_system';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

import { ModalRecuperarContrasenaComponent } from './modal-recuperar-contrasena/modal-recuperar-contrasena.component';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';

import { SonidoService } from 'app/shared/services/sonidos.service';
import { LoginService } from './login.service';
const sesion_activa: number = config.sesion_activa; // Minutos

export interface Data {
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
    hide: boolean = true;
    username: string;
    rol: string[] = [];

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
    )
    {  
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

    // -----------------------------------------------------------------------------------------------------
    
    recuperarContrasena() {                    // NO SE USA
        const dialogRef = this._dialog.open(ModalRecuperarContrasenaComponent);
    
        dialogRef.afterClosed().subscribe(result => {
            this._serviceSonido.playAudioAlert();
        });
    }

    // -----------------------------------------------------------------------------------------------------

    logIn() {
        let email:    string  = this.loginForm.get('email').value;
        let password: string  = this.loginForm.get('password').value;

        this.logout();
        
        this._loginService._obtenerLogin( email, password ).subscribe((info: ResponseLogin) => { 
            console.log("info - obtenerLogin|", info);
            
            if (info.token == null){          
                this._serviceSonido.playAudioAlert();
                let titulo = 'Fallo al ingresar';
                let mensaje = 'El usuario o la contraseña son incorrectos';
                this.mostrarError(0, titulo, mensaje);
            } 
            else {
                info = new ResponseLogin( info );
                this.setTiempoSession( info );
                this._serviceSonido.playAudioSuccess();
                this._router.navigate(['/inicio'])
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

        this._loginService.infoOnChanged.next( new ResponseLogin({}) ); 
        this._loginService.rolOnChanged.next([]);

        localStorage.clear();

        this._router.navigate(['']);
    }

    /**
     * setea en caso de error
     */
    private _defineError(): void {
        this.rol = [];
        this.info = 'error';
        
        this._loginService.rolOnChanged.next(this.rol);
        this._loginService.infoOnChanged.next(this.info);
    }

    //--------------------------------------------------------------------------------------------------

    private setTiempoSession(info: ResponseLogin): void {     

        //objeto que contiene el tiempo de session limite
        let expirarDate = new Date();
        expirarDate.setMinutes(expirarDate.getMinutes() + sesion_activa);
        
        this.info = info;
        this.username = info.username;

        this.setearRol(); 
        
        let dataCookie: Data = {
            expirar: expirarDate,
            infoToken: info.token,
            user: info.username
        };
        
        this.guardarInfoEnLocalStorage( dataCookie );
        
        this._loginService.infoOnChanged.next(this.info);
        this._loginService.rolOnChanged.next(this.rol);
    }
    
    // -----------------------------------------------------------------------------------------------------
    
    setearRol(): void {
        if (this.info.username === "burroni.santiago"){
            this.rol = ["admin"];
        }
        if (this.info.username === "herrada.laura"){
            this.rol = ["comun"];
        }
        if (this.info.username === "honaine.nicolas"){
            this.rol = ["comun"];
        }
        if (this.info.username === "luque.gonzalo"){
            this.rol = ["comun"];
        }
        if (this.info.username === "thomas.juan"){
            this.rol = ["comun"];
        }
        if (this.info.username === "cejas.fernando"){
            this.rol = ["cedis"];
        }
        if (this.info.username === "jacobo.pablo"){
            this.rol = ["cedis"];
        }
        if (this.info.username === "augelli.angel"){
            this.rol = ["cedis"];
        }
        localStorage.setItem("rol", this.rol.toString());
    }

    // -----------------------------------------------------------------------------------------------------
    /**
     * se encarga de setear las cookies o de extender las mas importantes si es el caso
     * para extender las cookies solamente NO hay que enviar la data
     * @param {DataCookie} data 
     */
    private guardarInfoEnLocalStorage(data?: Data): void {

        //console.log("token + tiempo sesion",{data});
        if ( data ){
            localStorage.setItem("token", data.infoToken);
            localStorage.setItem("username", data.user);
            localStorage.setItem("expirar", data.expirar.toString());
        }

        // obtengo el token en el service para tenerlo disponible ahí, para futuros chequeos de logueo
        this._loginService.getToken();   
    }

    //--------------------------------------------------------------------------------------------------

    /**
     * Determina si los datos de log estan disponibles            // YA ESTA EN EL COMPONENT
     */
    estaLogueado(): boolean {
        const userLog = localStorage.getItem("username");
        const tokenLog = localStorage.getItem("token");
        console.log("userLog",userLog, "tokenLog", tokenLog);
        if ((userLog) && (tokenLog)) {
            return true;
        } else {
            this.logout();
            return false;
        }    
    }

    //--------------------------------------------------------------------------------------------------
        
    private mostrarError( errStatus, titulo, mensaje ){
        const dialogRef = this._dialog.open( ModalErrorComponent, { 
          data: {
            titulo: titulo,
            mensaje: mensaje
          } 
        });
    }
}