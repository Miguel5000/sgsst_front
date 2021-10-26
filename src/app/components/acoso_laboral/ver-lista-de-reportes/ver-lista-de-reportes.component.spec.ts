import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaDeReportesComponent } from './ver-lista-de-reportes.component';

describe('VerListaDeReportesComponent', () => {
  let component: VerListaDeReportesComponent;
  let fixture: ComponentFixture<VerListaDeReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaDeReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaDeReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
