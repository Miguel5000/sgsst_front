import { TestBed } from '@angular/core/testing';

import { InformesMejoraService } from './informes-mejora.service';

describe('InformesMejoraService', () => {
  let service: InformesMejoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformesMejoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
