import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCheckoutComponent } from './history-checkout.component';

describe('HistoryCheckoutComponent', () => {
  let component: HistoryCheckoutComponent;
  let fixture: ComponentFixture<HistoryCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryCheckoutComponent]
    });
    fixture = TestBed.createComponent(HistoryCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
