import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermohonanPage } from './permohonan.page';

describe('PermohonanPage', () => {
  let component: PermohonanPage;
  let fixture: ComponentFixture<PermohonanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PermohonanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
