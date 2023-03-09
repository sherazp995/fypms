import { TestBed } from '@angular/core/testing';

import { TokenInspectorService } from './token.inspector.service';

describe('TokenInspectorService', () => {
  let service: TokenInspectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInspectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
