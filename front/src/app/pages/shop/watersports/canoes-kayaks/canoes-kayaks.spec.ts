import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanoesKayaks } from './canoes-kayaks';

describe('CanoesKayaks', () => {
  let component: CanoesKayaks;
  let fixture: ComponentFixture<CanoesKayaks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanoesKayaks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanoesKayaks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
