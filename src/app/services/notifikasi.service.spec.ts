import { TestBed } from '@angular/core/testing';

import { NotifikasiService } from './notifikasi.service';

describe('NotifikasiService', () => {
  let service: NotifikasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifikasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
