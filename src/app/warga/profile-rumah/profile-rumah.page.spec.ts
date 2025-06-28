import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileRumahPage } from './profile-rumah.page';

describe('ProfileRumahPage', () => {
  let component: ProfileRumahPage;
  let fixture: ComponentFixture<ProfileRumahPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRumahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
