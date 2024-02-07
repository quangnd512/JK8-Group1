import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDiscounted]'
})
export class DiscountedDirective {
  @Input() stoke = "line-through"

  constructor(private el: ElementRef) {
  }

  public ngOnInit(): void {
    this.el.nativeElement.style.textDecoration = this.stoke
  }
}
