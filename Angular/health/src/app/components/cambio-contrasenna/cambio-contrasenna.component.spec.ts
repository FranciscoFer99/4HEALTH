import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContrasennaComponent } from './cambio-contrasenna.component';

describe('CambioContrasennaComponent', () => {
  let component: CambioContrasennaComponent;
  let fixture: ComponentFixture<CambioContrasennaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioContrasennaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContrasennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
