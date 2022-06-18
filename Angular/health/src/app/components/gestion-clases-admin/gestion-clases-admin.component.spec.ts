import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClasesAdminComponent } from './gestion-clases-admin.component';

describe('GestionClasesAdminComponent', () => {
  let component: GestionClasesAdminComponent;
  let fixture: ComponentFixture<GestionClasesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionClasesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClasesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
