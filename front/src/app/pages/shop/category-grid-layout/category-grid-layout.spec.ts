import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGridLayout } from './category-grid-layout';

describe('CategoryGridLayout', () => {
  let component: CategoryGridLayout;
  let fixture: ComponentFixture<CategoryGridLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryGridLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryGridLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
