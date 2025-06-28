import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPengaduanPage } from './form-pengaduan.page';

describe('FormPengaduanPage', () => {
  let component: FormPengaduanPage;
  let fixture: ComponentFixture<FormPengaduanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPengaduanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
