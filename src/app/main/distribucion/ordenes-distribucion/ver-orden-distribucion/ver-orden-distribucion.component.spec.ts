import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenDistribucionComponent } from './ver-orden-distribucion.component';

describe('BuscarLoteComponent', () => {
  let component: VerOrdenDistribucionComponent;
  let fixture: ComponentFixture<VerOrdenDistribucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerOrdenDistribucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerOrdenDistribucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
