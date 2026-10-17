import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TierListComponent } from './tier-list.component';

describe('TierListComponent', () => {
  let component: TierListComponent;
  let fixture: ComponentFixture<TierListComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
