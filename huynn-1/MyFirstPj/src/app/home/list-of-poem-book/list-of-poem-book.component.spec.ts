import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPoemBookComponent } from './list-of-poem-book.component';

describe('ListOfPoemBookComponent', () => {
  let component: ListOfPoemBookComponent;
  let fixture: ComponentFixture<ListOfPoemBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfPoemBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfPoemBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
