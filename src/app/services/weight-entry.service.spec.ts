import { TestBed, inject } from '@angular/core/testing';

import { WeightEntryService } from './weight-entry.service';

describe('WeightEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightEntryService]
    });
  });

  it('should be created', inject([WeightEntryService], (service: WeightEntryService) => {
    expect(service).toBeTruthy();
  }));
});
