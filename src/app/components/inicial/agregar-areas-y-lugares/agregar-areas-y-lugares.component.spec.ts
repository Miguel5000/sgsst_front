import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAreasYLugaresComponent } from './agregar-areas-y-lugares.component';

describe('AgregarAreasYLugaresComponent', () => {
  let component: AgregarAreasYLugaresComponent;
  let fixture: ComponentFixture<AgregarAreasYLugaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAreasYLugaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAreasYLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
