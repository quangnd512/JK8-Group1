import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListIssueComponent } from './admin-list-issue.component';

describe('AdminListIssueComponent', () => {
  let component: AdminListIssueComponent;
  let fixture: ComponentFixture<AdminListIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListIssueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
