import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPicker } from './category-picker';

describe('CategoryPicker', () => {
  let component: CategoryPicker;
  let fixture: ComponentFixture<CategoryPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
