import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

//import { UsuarioService } from 'app/shared/services/usuario.service';
import { AuthStorageService } from '../../auth/login/auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private _authStorage: AuthStorageService) { 

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available

        console.log('*** Hola Soy el Interceptor *** : ', request.url);
        
        const headers = new HttpHeaders({
            'Content-Type' : 'application/json; charset=utf-8',
            'Accept'       : 'application/json',
            'Authorization': `${ this._authStorage.getToken() }`
        });   

        const requestClone = request.clone({
            headers
        });
        return next.handle( requestClone );
        
/*         return from(this._authStorage.getToken())
        .pipe(
            switchMap(token => {
                const headers = request.headers
                .set('Authorization', token)
                .append('Content-Type', 'application/json');
                const requestClone = request.clone({
                    headers 
                });
            console.log('*** Hola Soy el Interceptor Y ESTOY ADENTRO *** : ', token);
            return next.handle(requestClone);
          })
         ); */
        
        // Con esto solo afectamos a las request contra el Tomcat
        //     if ( request.url.includes('apiOnboard') ) {

        //         request = request.clone( {
        //             setHeaders: 
        //             {
        //                 Authorization: this.getHeader().,
        //                 Nombre: 'Diego'
        //             }
        //         })
        //     }
    }

}