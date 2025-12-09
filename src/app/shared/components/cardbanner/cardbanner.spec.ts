import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardbanner } from './cardbanner';

describe('Cardbanner', () => {
  let component: Cardbanner;
  let fixture: ComponentFixture<Cardbanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cardbanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cardbanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
