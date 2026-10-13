import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGenerator } from './list-generator';

describe('ListGenerator', () => {
  let component: ListGenerator;
  let fixture: ComponentFixture<ListGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
