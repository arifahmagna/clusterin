import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTamuPage } from './input-tamu.page';

describe('InputTamuPage', () => {
  let component: InputTamuPage;
  let fixture: ComponentFixture<InputTamuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTamuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
