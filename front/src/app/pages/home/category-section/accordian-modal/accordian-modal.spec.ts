import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianModal } from './accordian-modal';

describe('AccordianModal', () => {
  let component: AccordianModal;
  let fixture: ComponentFixture<AccordianModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordianModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordianModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
