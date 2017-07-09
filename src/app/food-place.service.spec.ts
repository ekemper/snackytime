import { TestBed, inject } from '@angular/core/testing';

import { FoodPlaceService } from './food-place.service';

describe('FoodPlaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodPlaceService]
    });
  });

  it('should be created', inject([FoodPlaceService], (service: FoodPlaceService) => {
    expect(service).toBeTruthy();
  }));
});
