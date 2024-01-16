import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminAddUserComponent } from './admin-admin-add-user.component';

describe('AdminAdminAddUserComponent', () => {
  let component: AdminAdminAddUserComponent;
  let fixture: ComponentFixture<AdminAdminAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdminAddUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAdminAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
