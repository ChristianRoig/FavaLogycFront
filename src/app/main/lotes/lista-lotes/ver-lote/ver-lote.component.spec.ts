import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLoteComponent } from './ver-lote.component';

describe('BuscarLoteComponent', () => {
  let component: VerLoteComponent;
  let fixture: ComponentFixture<VerLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
