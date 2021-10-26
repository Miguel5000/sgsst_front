import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioDeTrabajoYServicioComponent } from './espacio-de-trabajo-y-servicio.component';

describe('EspacioDeTrabajoYServicioComponent', () => {
  let component: EspacioDeTrabajoYServicioComponent;
  let fixture: ComponentFixture<EspacioDeTrabajoYServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacioDeTrabajoYServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacioDeTrabajoYServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
