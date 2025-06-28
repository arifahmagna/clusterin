import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPermohonanPage } from './form-permohonan.page';

describe('FormPermohonanPage', () => {
  let component: FormPermohonanPage;
  let fixture: ComponentFixture<FormPermohonanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPermohonanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
