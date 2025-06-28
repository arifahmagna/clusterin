import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPribadiPage } from './info-pribadi.page';

describe('InfoPribadiPage', () => {
  let component: InfoPribadiPage;
  let fixture: ComponentFixture<InfoPribadiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPribadiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
