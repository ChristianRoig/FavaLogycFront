import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const url_node = environment.url_node;
const url_tomcat = environment.url_tomcat;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string = '';

  constructor(private _HttpClient: HttpClient, private router: Router) { }

  login( usuario: string, password: string ) {

    let headers = new HttpHeaders();

    let body = {
      user: usuario,
      pass: password
    }

    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_node }/active/directory`, body, { headers }).subscribe( async res => {
        
        if( res['access_token'] ) {
          await this.setToken( res['access_token'] );
          let user: {} = await this.loginOk(usuario);
          await this.setPromotor(JSON.stringify(user));
          resolve(user);
        } else {
          await this.clearUser();
          resolve(false);
        }

      });

    });

  }

  setToken( token: string ) {

    return new Promise( async resolve => {

      this.token = token;
      localStorage.setItem('token', token);
      
      resolve(true);
      
    });

  }
  getToken() {
    
    return new Promise( async resolve => {
      
      this.token = localStorage.getItem('token') || '';
      resolve(this.token);

    });

  }

  setPromotor( promotor: string ) {

    return new Promise( async resolve => {

      localStorage.setItem('promotor', promotor);
      
      resolve(true);
      
    });
    
  }
  
  getPromotor() {
    
    return new Promise( async resolve => {
      
      let promotor = localStorage.getItem('promotor') || '';
      resolve(promotor);

    });

  }

  setPersona( persona: string ) {

    return new Promise( async resolve => {

      localStorage.setItem('persona', persona);
      
      resolve(true);
      
    });

  }
  getPersona() {
    
    return new Promise( async resolve => {
      
      let persona = localStorage.getItem('persona') || '';
      resolve(persona);

    });

  }

  clearUser() {
    
    return new Promise( async resolve => {
      
      localStorage.clear();
      this.token = ''
      resolve(true);

    });

  }

  async validaToken() {

    let token = await this.getToken();
    
    if( token ) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }

  }

  loginOk( usuario: string ) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = {
      usuarioAD: usuario
    }

    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_LoginOK`, body, { headers }).subscribe( async res => {
        
        resolve(res);

      });

    });

  }

  async buscarPersona( dni: number ) {

    await this.getToken();

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = {
      NroDoc: dni
    }

    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_getPersonaNroDoc`, body, { headers }).subscribe( async res => {
        
        if( res['sdt_onbPersonaNroDoc'] ) {
          resolve( res['sdt_onbPersonaNroDoc'] );
        }

      });

    });

  }

  getOcupaciones() {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = {}
    
    
    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_getOcupaciones`, body, { headers }).subscribe( res => {
        
        if( res['sdt_onbOcupaciones'] ) {
          
          resolve( res );

        }

      });

    });

  }

  getTraerPersona(id) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });
    
    return new Promise( resolve => {
      
      this._HttpClient.get(`${ url_tomcat }apiONB_persona/${id}`, { headers }).subscribe( res => {
        
        if( res ) {
          
          resolve( res );

        } else {

          resolve(false);

        }

      });

    });

  }

  guardarPersona(datosBody) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = datosBody
    
    
    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_persona/0`, body, { headers }).subscribe( res => {
        
        if( res ) {
          
          console.log(res);
          
          resolve( res );

        }

      });

    });

  }

  putPersona(id, datosBody) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = datosBody
    
    
    return new Promise( resolve => {
      
      this._HttpClient.put(`${ url_tomcat }apiONB_persona/${id}`, body, { headers }).subscribe( res => {
        
        if( res ) {
          
          console.log(res);
          
          resolve( res );

        }

      });

    });

  }

  guardarTelefonoPersona(datosBody, id) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = datosBody
    
    
    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_personaTelefono/${id},0`, body, { headers }).subscribe( res => {
        
        if( res ) {
          
          console.log(res);
          
          resolve( true );

        } else {

          resolve(false);

        }

      });

    });

  }

  getTelefonoPersona(id) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });
    
    return new Promise( resolve => {
      
      this._HttpClient.get(`${ url_tomcat }apiONB_personaTelefono/${id},1`, { headers }).subscribe( res => {
        
        if( res ) {
          
          console.log(res);
          
          resolve( res );

        } else {

          resolve(false);

        }

      });

    });

  }

  putTelefonoPersona(datosBody, id) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = datosBody
    
    
    return new Promise( resolve => {
      
      this._HttpClient.put(`${ url_tomcat }apiONB_personaTelefono/${id},1`, body, { headers }).subscribe( res => {
        
        if( res ) {
          
          console.log(res);
          
          resolve( true );

        } else {

          resolve(false);

        }

      });

    });

  }

  guardarPrecal(datosBody) {

    let headers = new HttpHeaders({
      'Authorization': `OAuth ${this.token}`
    });

    let body = datosBody
    
    
    return new Promise( resolve => {
      
      this._HttpClient.post(`${ url_tomcat }apiONB_nuevaPrecal`, body, { headers }).subscribe( res => {

        console.log(res);
        
        if( res['err_cod'] === 0 ) {
          
          resolve( res['sdt_onbNuevaPrecal'] );
          
        } else {
          
          resolve( false );

        }

      });

    });

  }

}
