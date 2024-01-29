import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAllBookComponent } from './shop-all-book.component';

describe('ShopAllBookComponent', () => {
  let component: ShopAllBookComponent;
  let fixture: ComponentFixture<ShopAllBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopAllBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopAllBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
