import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeInformesComponent } from './registro-de-informes.component';

describe('RegistroDeInformesComponent', () => {
  let component: RegistroDeInformesComponent;
  let fixture: ComponentFixture<RegistroDeInformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDeInformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeInformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
