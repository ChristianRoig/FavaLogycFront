import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerImpresorasComponent } from './ver-impresoras.component';

describe('BuscarLoteComponent', () => {
  let component: VerImpresorasComponent;
  let fixture: ComponentFixture<VerImpresorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerImpresorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerImpresorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
