import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboarditem } from './dashboarditem';

describe('Dashboarditem', () => {
  let component: Dashboarditem;
  let fixture: ComponentFixture<Dashboarditem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboarditem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboarditem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
