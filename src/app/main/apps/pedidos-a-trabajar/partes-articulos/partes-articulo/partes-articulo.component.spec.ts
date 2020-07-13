import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PedidosPartesArticuloComponent } from './partes-articulo.component';
import { PedidosPartesArticulosService } from './partes-articulo.service';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { PedidosModule } from '../../pedidos.module';
import { ModalErrorComponent } from 'app/shared/modal-error/modal-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs';

class FakeRouter {
    navigate( params ) { }
}

class FakeConfiguracionService {

    environment = {
        production: false,
        hmr       : false,
        server    : 'http://192.168.100.191:8080/',
        // server    : 'http://192.168.0.6:8080/',
        baseUrl   : 'api_favalogyc/'  
    };
}

describe('PedidosPartesArticuloComponent', () => {

    let component: PedidosPartesArticuloComponent ;
    let fixture: ComponentFixture<PedidosPartesArticuloComponent>

    let err = {
        error: "NOT_FOUND",
        message: "Lista de partes de articulos no encontrada.",
        path: "http://192.168.100.191:8080/api_favalogyc/pedidosatrabajar/articuloparte/porcodigoonombre/gssgsgfh/0/10/id/asc",
        status: 404,
        timeStamp: 1594220031733 
    };
    
    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                PedidosPartesArticuloComponent,
                ModalErrorComponent,
            ],
            providers: [
                {
                    provide: Router,
                    useClass: FakeRouter
                },
                PedidosPartesArticulosService,
                HttpClient
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpClientModule,
                PedidosModule,
                BrowserAnimationsModule
            ]
        })
        .overrideComponent(PedidosPartesArticuloComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })
        .compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent( PedidosPartesArticuloComponent );
        component = fixture.componentInstance;

        component.length = 0;
        component.busqueda = ""
        component.page = 0;
        component.size = 10;
        component.columna = 'id';
        component.order = 'asc';
    });
    
    it('Se creó el componente', () => {
        expect(component).toBeTruthy();
    });
    
    it('La busqueda trajo registros', async() => {
        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }

        component.buscar(component.busqueda, component.page, component.size, component.columna, component.order);

        await fixture.whenStable().then(async() => {

            await delay(300);
            
            expect(component.length).toBeGreaterThan(0);
            // expect(component.length).toBe(0);
        });
        
    });

    // xit('Debe llamar al metodo mostrarError', async() => {
    //     function delay(ms: number) {
    //         return new Promise( resolve => setTimeout(resolve, ms) );
    //     }

    //     err

    //     const espia = spyOn(component, 'mostrarError').and.returnValue( Observable.throw();
    //     });
        
    //     component.busqueda = "paraprapra";

    //     await fixture.whenStable().then(async() => {

    //         await delay(300);
            
    //         expect(espia).toHaveBeenCalled();
    //     });
        
    // });
});