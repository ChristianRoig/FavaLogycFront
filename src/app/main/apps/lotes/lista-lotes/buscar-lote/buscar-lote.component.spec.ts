import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarLoteComponent } from './buscar-lote.component';

describe('BuscarLoteComponent', () => {
  let component: BuscarLoteComponent;
  let fixture: ComponentFixture<BuscarLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
