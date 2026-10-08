import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GachaTierList } from './gacha-tier-list';

describe('GachaTierList', () => {
  let component: GachaTierList;
  let fixture: ComponentFixture<GachaTierList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GachaTierList],
    }).compileComponents();

    fixture = TestBed.createComponent(GachaTierList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
