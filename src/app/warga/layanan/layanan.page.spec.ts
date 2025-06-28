import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayananPage } from './layanan.page';

describe('LayananPage', () => {
  let component: LayananPage;
  let fixture: ComponentFixture<LayananPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LayananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
