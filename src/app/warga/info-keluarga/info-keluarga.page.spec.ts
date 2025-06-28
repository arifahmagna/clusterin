import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoKeluargaPage } from './info-keluarga.page';

describe('InfoKeluargaPage', () => {
  let component: InfoKeluargaPage;
  let fixture: ComponentFixture<InfoKeluargaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoKeluargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
