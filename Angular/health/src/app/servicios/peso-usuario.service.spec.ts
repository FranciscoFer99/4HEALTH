import { TestBed } from '@angular/core/testing';

import { PesoUsuarioService } from './peso-usuario.service';

describe('PesoUsuarioService', () => {
  let service: PesoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
