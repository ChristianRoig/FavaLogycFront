import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRemitoComponent } from './ver-remito.component';

describe('BuscarLoteComponent', () => {
  let component: VerRemitoComponent;
  let fixture: ComponentFixture<VerRemitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRemitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRemitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
