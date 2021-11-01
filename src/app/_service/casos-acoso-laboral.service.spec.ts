import { TestBed } from '@angular/core/testing';

import { CasosAcosoLaboralService } from './casos-acoso-laboral.service';

describe('CasosAcosoLaboralService', () => {
  let service: CasosAcosoLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasosAcosoLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
