import { TestBed } from '@angular/core/testing';

import { UsuarioClaseService } from './usuario-clase.service';

describe('UsuarioClaseService', () => {
  let service: UsuarioClaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioClaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
