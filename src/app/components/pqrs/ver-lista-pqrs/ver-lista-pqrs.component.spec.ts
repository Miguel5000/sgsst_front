import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaPqrsComponent } from './ver-lista-pqrs.component';

describe('VerListaPqrsComponent', () => {
  let component: VerListaPqrsComponent;
  let fixture: ComponentFixture<VerListaPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaPqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
