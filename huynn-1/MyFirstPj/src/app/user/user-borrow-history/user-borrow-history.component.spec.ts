import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBorrowHistoryComponent } from './user-borrow-history.component';

describe('UserBorrowHistoryComponent', () => {
  let component: UserBorrowHistoryComponent;
  let fixture: ComponentFixture<UserBorrowHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBorrowHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBorrowHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
