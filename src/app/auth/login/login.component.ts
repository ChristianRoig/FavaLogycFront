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
import { AuthStorageService } from './auth-storage.service';



const sesion_activa: number = config.sesion_activa; // Minutos

export interface Data {
    infoToken?: string;
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

    // Sucursal
    idSuc: number = 1;
    nbSuc: string = "CASA CENTRAL";

    /*infoOnChanged: BehaviorSubject<any>;
    perfilLogOnChanged: BehaviorSubject<any>;
    rolOnChanged: BehaviorSubject<any>;*/

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
        private _authStorage: AuthStorageService
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

        this.logout();

        this.loginForm = this._formBuilder.group({

            user   : ['', Validators.required],
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

    logIn(): void {
        let user:    string  = this.loginForm.get('user').value;
        let password: string  = this.loginForm.get('password').value;

        this.logout();


        /* Lineas para autenticar admin/cedis/suc */
        if ( this.chequearUserEspecial( user, password )) {

            this.asignarDataSegunUser( user );
            this._loginService.hideByRol([]);
            this._serviceSonido.playAudioSuccess();
            this._router.navigate(['/inicio']);
        } /* ------------------------------------------------------ */
        else {
            this._loginService._obtenerLogin( user, password ).subscribe((info: ResponseLogin) => { 
                console.log("info - obtenerLogin|", info);
                
                if (info.token == null){          
                    this._serviceSonido.playAudioAlert();
                    let titulo = 'Fallo al ingresar';
                    let mensaje = 'El usuario o la contraseña son incorrectos';
                    this.mostrarError(0, titulo, mensaje);
                } 
                else {
                    info = new ResponseLogin( info );
                    this.info = info;
  
                    this._authStorage.guardarToken( info.token );
                    this._authStorage.guardarUser( info.username );
                    this._authStorage.guardarSession();
                    this.setearRol( info );

                    this._loginService.rolOnChanged.next(this.rol);
                    this._loginService.infoOnChanged.next(this.info);
  
                    this._serviceSonido.playAudioSuccess();
                    this._router.navigate(['/inicio'])
                }
                /* ----------------------------------------------------- */
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
        
    }

    // -----------------------------------------------------------------------------------------------------
    /**
     * Metodo para cerrar la sesion
     */
    private logout(): void {

        this._loginService.infoOnChanged.next( new ResponseLogin({}) ); 
        this._loginService.rolOnChanged.next([]);

        this._authStorage.singOut();

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
        
        this.info = info;
        this.username = info.username;

        this.setearRol( info ); 
        
        let dataCookie: Data = {
            infoToken: info.token,
            user: info.username
        };
        
       //this.guardarInfoEnLocalStorage( dataCookie );
        
        this._loginService.infoOnChanged.next(this.info);
        this._loginService.rolOnChanged.next(this.rol);
    }

    // -----------------------------------------------------------------------------------------------------
    private chequearUserEspecial( user: string, password: string ): any{
        
        if (user === "admin" && password == "1234"){
            return true;
        }
        if (user === "cedis" && password == "1234"){
            return true;
        }
        if (user === "suc" && password == "1234"){
            return true;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    //funcion para asignar datos a usuarios especiales
    private asignarDataSegunUser( user: string ): any{   

        //Defaults
        this.rol = ["comun"];
        this.idSuc = 1;
        this.nbSuc = "CASA CENTRAL";

        let data: Data = {
            infoToken:  "",
            user:  ""
        }

        if (user === "admin"){
            data.infoToken = "MOCK-AUTH-user-santiago.burroni-suc-95";
            data.user = "burroni.santiago";
            this.rol = ["admin"];
        }
        if (user === "cedis"){
            data.infoToken = "MOCK-AUTH-user-pablo.jacobo-suc-95";
            data.user = "jacobo.pablo";
            this.rol = ["cedis"];
        }
        if (user === "suc"){
            data.infoToken = "MOCK-AUTH-user-gonzalo.luque-suc-21";
            data.user = "luque.gonzalo";
            this.idSuc = 8;
            this.nbSuc = "PUERTO";
        }

        // guardar datos en localStorage
        this._authStorage.guardarToken( data.infoToken );         
        this._authStorage.guardarUser( data.user );
        this._authStorage.guardarSession();         
        this._authStorage.guardarRol( this.rol.toString() );         
        this._authStorage.guardarIdSuc( this.idSuc.toString() );         
        this._authStorage.guardarNbSuc( this.nbSuc );         
        
    }

    // -----------------------------------------------------------------------------------------------------
    
    setearRol( info ): void {
        console.log("this.info.username", info.username);
        
        //Roles y Sucursales asignados
        if (info.username === "burroni.santiago"){
            console.log("llego hasta acaa");
            this.rol = ["admin"];
        }
        if (info.username === "cejas.fernando"){
            this.rol = ["cedis"];
        }
        if (info.username === "jacobo.pablo"){
            this.rol = ["cedis"];
        }
        if (info.username === "augelli.angel"){
            this.rol = ["cedis"];
        }
        if (info.username === "luque.gonzalo"){
            this.idSuc = 8;
            this.nbSuc = "PUERTO";
        }
        if (info.username === "thomas.juan"){
            this.idSuc = 10;
            this.nbSuc = "TANDIL";
        } 
        if ( this.rol == [] ) {
            this.rol = ["comun"];
            this.idSuc = 1;
            this.nbSuc = "CASA CENTRAL"; 
        }

        this._authStorage.guardarRol( this.rol.toString() );         
        this._authStorage.guardarIdSuc( this.idSuc.toString() );         
        this._authStorage.guardarNbSuc( this.nbSuc );   

        this._loginService.hideByRol([]);
    }

    // -----------------------------------------------------------------------------------------------------
    /**
     * se encarga de setear las cookies o de extender las mas importantes si es el caso
     * para extender las cookies solamente NO hay que enviar la data
     * @param {DataCookie} data 
     */
    /* private guardarInfoEnLocalStorage(data?: Data): void {

        //console.log("token + tiempo sesion",{data});
        if ( data ){
            localStorage.setItem("token", data.infoToken);
            localStorage.setItem("username", data.user);
        }

        // obtengo el token en el service para tenerlo disponible ahí, para futuros chequeos de logueo
        this._loginService.getToken();   
    } */

    //--------------------------------------------------------------------------------------------------

    /**
     * Determina si los datos de log estan disponibles            // YA ESTA EN EL COMPONENT
     */
/*     estaLogueado(): boolean {
        const userLog = localStorage.getItem("username");
        const tokenLog = localStorage.getItem("token");
        console.log("userLog",userLog, "tokenLog", tokenLog);
        if ((userLog) && (tokenLog)) {
            return true;
        } else {
            this.logout();
            return false;
        }    
    } */

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