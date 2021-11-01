import { TestBed } from '@angular/core/testing';

import { GruposSgsstService } from './grupos-sgsst.service';

describe('GruposSgsstService', () => {
  let service: GruposSgsstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposSgsstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
