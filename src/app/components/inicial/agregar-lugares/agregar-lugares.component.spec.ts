import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLugaresComponent } from './agregar-lugares.component';

describe('AgregarLugaresComponent', () => {
  let component: AgregarLugaresComponent;
  let fixture: ComponentFixture<AgregarLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarLugaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
