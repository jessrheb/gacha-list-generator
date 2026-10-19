import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Droplist } from './droplist';

describe('Droplist', () => {
  let component: Droplist;
  let fixture: ComponentFixture<Droplist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Droplist],
    }).compileComponents();

    fixture = TestBed.createComponent(Droplist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
