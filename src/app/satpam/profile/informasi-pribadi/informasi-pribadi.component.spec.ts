import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformasiPribadiComponent } from './informasi-pribadi.component';

describe('InformasiPribadiComponent', () => {
  let component: InformasiPribadiComponent;
  let fixture: ComponentFixture<InformasiPribadiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InformasiPribadiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformasiPribadiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
