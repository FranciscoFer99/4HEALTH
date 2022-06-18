import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarClaseComponent } from './recuperar-clase.component';

describe('RecuperarClaseComponent', () => {
  let component: RecuperarClaseComponent;
  let fixture: ComponentFixture<RecuperarClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperarClaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
