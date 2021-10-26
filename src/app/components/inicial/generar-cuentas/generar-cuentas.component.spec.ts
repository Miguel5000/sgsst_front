import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCuentasComponent } from './generar-cuentas.component';

describe('GenerarCuentasComponent', () => {
  let component: GenerarCuentasComponent;
  let fixture: ComponentFixture<GenerarCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
