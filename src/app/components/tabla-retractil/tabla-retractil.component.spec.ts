import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRetractilComponent } from './tabla-retractil.component';

describe('TablaRetractilComponent', () => {
  let component: TablaRetractilComponent;
  let fixture: ComponentFixture<TablaRetractilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRetractilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRetractilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
