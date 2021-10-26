import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionDeClaveComponent } from './generacion-de-clave.component';

describe('GeneracionDeClaveComponent', () => {
  let component: GeneracionDeClaveComponent;
  let fixture: ComponentFixture<GeneracionDeClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneracionDeClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionDeClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
