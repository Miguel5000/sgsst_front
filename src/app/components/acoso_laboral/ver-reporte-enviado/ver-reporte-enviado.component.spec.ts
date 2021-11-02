import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReporteEnviadoComponent } from './ver-reporte-enviado.component';

describe('VerReporteEnviadoComponent', () => {
  let component: VerReporteEnviadoComponent;
  let fixture: ComponentFixture<VerReporteEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReporteEnviadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReporteEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
