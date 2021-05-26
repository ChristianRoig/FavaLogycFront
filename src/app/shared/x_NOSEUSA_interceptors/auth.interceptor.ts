import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';


import { UsuarioService } from 'app/services/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private usuario: UsuarioService) { 

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available

        console.log('*** Hola Soy el Interceptor *** : ', request.url);
        
        
        return from(this.usuario.getToken())
        .pipe(
            switchMap(token => {
                const headers = request.headers
                .set('Authorization', 'OAuth ' + token)
                .append('Content-Type', 'application/json');
                const requestClone = request.clone({
                    headers 
                });
            console.log('*** Hola Soy el Interceptor Y ESTOY ADENTRO *** : ', token);
            return next.handle(requestClone);
          })
         );
        
        // let headers = new HttpHeaders({
        //     'Authorization': `OAuth ${ this.usuario.getToken() }`
        // });   


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


        // return next.handle(request);

    }

}