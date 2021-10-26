import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAreasComponent } from './agregar-areas.component';

describe('AgregarAreasComponent', () => {
  let component: AgregarAreasComponent;
  let fixture: ComponentFixture<AgregarAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
