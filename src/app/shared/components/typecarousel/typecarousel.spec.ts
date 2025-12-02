import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typecarousel } from './typecarousel';

describe('Typecarousel', () => {
  let component: Typecarousel;
  let fixture: ComponentFixture<Typecarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typecarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typecarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
