import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarPqrsComponent } from './enviar-pqrs.component';

describe('EnviarPqrsComponent', () => {
  let component: EnviarPqrsComponent;
  let fixture: ComponentFixture<EnviarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarPqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
