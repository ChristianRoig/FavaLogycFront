import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioErroneoComponent } from './modal-usuario-erroneo.component';

describe('ModalUsuarioErroneoComponent', () => {
  let component: ModalUsuarioErroneoComponent;
  let fixture: ComponentFixture<ModalUsuarioErroneoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUsuarioErroneoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioErroneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
