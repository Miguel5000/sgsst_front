import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDeClaveComponent } from './cambio-de-clave.component';

describe('CambioDeClaveComponent', () => {
  let component: CambioDeClaveComponent;
  let fixture: ComponentFixture<CambioDeClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioDeClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioDeClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
