import { TestBed } from '@angular/core/testing';

import { EventDriverService } from './event.driver.service';

describe('Event.DriverService', () => {
  let service: EventDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
