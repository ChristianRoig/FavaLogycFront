import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const BASE_URL = environment.server + environment.baseUrl;

@Injectable()
export class PedidosListaService
{
    constructor(
        private _httpClient: HttpClient
    )
    {
    }

}
