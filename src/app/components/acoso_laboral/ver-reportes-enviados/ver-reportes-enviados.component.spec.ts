import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReportesEnviadosComponent } from './ver-reportes-enviados.component';

describe('VerReportesEnviadosComponent', () => {
  let component: VerReportesEnviadosComponent;
  let fixture: ComponentFixture<VerReportesEnviadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerReportesEnviadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReportesEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
