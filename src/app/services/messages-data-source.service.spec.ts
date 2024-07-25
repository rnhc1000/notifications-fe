import { TestBed } from '@angular/core/testing';

import { MessagesDataSourceService } from './messages-data-source.service';

describe('MessagesDataSourceService', () => {
  let service: MessagesDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
