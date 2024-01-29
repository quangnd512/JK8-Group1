import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfShortStoryBookComponent } from './list-of-short-story-book.component';

describe('ListOfShortStoryBookComponent', () => {
  let component: ListOfShortStoryBookComponent;
  let fixture: ComponentFixture<ListOfShortStoryBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfShortStoryBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfShortStoryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
