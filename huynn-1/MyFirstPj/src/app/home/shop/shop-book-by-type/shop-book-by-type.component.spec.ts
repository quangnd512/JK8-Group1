import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBookByTypeComponent } from './shop-book-by-type.component';

describe('ShopBookByTypeComponent', () => {
  let component: ShopBookByTypeComponent;
  let fixture: ComponentFixture<ShopBookByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopBookByTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopBookByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
