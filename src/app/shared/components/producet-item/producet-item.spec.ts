import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducetItem } from './producet-item';

describe('ProducetItem', () => {
  let component: ProducetItem;
  let fixture: ComponentFixture<ProducetItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducetItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducetItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
