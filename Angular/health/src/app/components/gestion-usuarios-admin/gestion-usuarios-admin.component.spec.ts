import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUsuariosAdminComponent } from './gestion-usuarios-admin.component';

describe('GestionUsuariosAdminComponent', () => {
  let component: GestionUsuariosAdminComponent;
  let fixture: ComponentFixture<GestionUsuariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionUsuariosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
