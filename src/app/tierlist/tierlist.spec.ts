import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tierlist } from './tierlist';

describe('Tierlist', () => {
  let component: Tierlist;
  let fixture: ComponentFixture<Tierlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tierlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Tierlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
