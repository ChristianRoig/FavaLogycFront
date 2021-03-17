import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class ControlarLoteService {

    constructor( private _httpClient: HttpClient) {}

    getArticulosDeLote( idLote, codArt, etapaproceso ): Observable<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let ruta = `${BASE_URL}pedidos/detalleunico/lote/${ idLote }/${ etapaproceso }/codbarras`;

        console.log('idLote', idLote, "| etapaproceso", etapaproceso, "| codArt", codArt);

        //let ruta = `${BASE_URL}pedidos/detalleunico/lote/${idLote}/${etapaproceso}/${codArt}`;
        //let ruta = `${BASE_URL}pedidos/detalleunico/lote/7/estanteria/a/codbarras`;
        //codBarras
        
        return this._httpClient.get(ruta, {headers: headers});
    }

    chequearArticulo(cupa, idLote, codBarras, modo): Observable<any> {

        let pedidoparte = modo === 'darsena' ? '/pedidoparte' : '';
    
        let ruta = `${BASE_URL}pedidos${pedidoparte}/cupa/lote/codbarras/${cupa}/${idLote}/${codBarras}`;
        
        return this._httpClient.get(ruta);
    }
    

    eliminarArticuloDeLotePorCupa( cupa ): Observable<any> {

        let headers = ({
            "Content-Type": "application/json"
        });

        let ruta = `${BASE_URL}pedidos/pedidolote/cupa/${cupa}`;
        

        return this._httpClient.delete(ruta, {headers: headers})
    }

}
