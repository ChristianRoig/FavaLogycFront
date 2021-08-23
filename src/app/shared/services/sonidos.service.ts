import { Injectable } from '@angular/core';

const url_node = '';
const url_tomcat = '';
// const url_node = environment.url_node;
// const url_tomcat = environment.url_tomcat;

@Injectable({
  providedIn: 'root'
})
export class SonidoService {

    constructor() { }

    playAudioSuccess(){
        let audio = new Audio();
        audio.src = "assets/audio/success.wav";
        audio.load();
        audio.play();
    }

    playAudioAlert(){
        let audio = new Audio();
        audio.src = "assets/audio/alert.wav";
        audio.load();
        audio.play();
    }

}
