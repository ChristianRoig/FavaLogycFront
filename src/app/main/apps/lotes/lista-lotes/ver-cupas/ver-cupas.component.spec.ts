import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCupasComponent } from './ver-cupas.component';

describe('BuscarLoteComponent', () => {
  let component: VerCupasComponent;
  let fixture: ComponentFixture<VerCupasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCupasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCupasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
