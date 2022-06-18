import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionUsuarioComponent } from './evolucion-usuario.component';

describe('EvolucionUsuarioComponent', () => {
  let component: EvolucionUsuarioComponent;
  let fixture: ComponentFixture<EvolucionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolucionUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
