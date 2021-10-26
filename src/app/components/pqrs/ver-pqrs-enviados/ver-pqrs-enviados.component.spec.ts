import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPqrsEnviadosComponent } from './ver-pqrs-enviados.component';

describe('VerPqrsEnviadosComponent', () => {
  let component: VerPqrsEnviadosComponent;
  let fixture: ComponentFixture<VerPqrsEnviadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPqrsEnviadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPqrsEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
