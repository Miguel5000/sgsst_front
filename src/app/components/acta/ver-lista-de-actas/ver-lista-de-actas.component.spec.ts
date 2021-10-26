import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaDeActasComponent } from './ver-lista-de-actas.component';

describe('VerListaDeActasComponent', () => {
  let component: VerListaDeActasComponent;
  let fixture: ComponentFixture<VerListaDeActasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaDeActasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaDeActasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
