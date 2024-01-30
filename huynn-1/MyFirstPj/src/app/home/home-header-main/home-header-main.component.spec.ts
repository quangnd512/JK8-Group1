import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderMainComponent } from './home-header-main.component';

describe('HomeHeaderMainComponent', () => {
  let component: HomeHeaderMainComponent;
  let fixture: ComponentFixture<HomeHeaderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeaderMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeHeaderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
