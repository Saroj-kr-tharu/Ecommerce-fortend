import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusHome } from './cus.home';

describe('CusHome', () => {
  let component: CusHome;
  let fixture: ComponentFixture<CusHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CusHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
