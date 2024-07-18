import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDisplayed]'
})
export class DisplayedDirective {
  constructor(private el: ElementRef) {
  }

  public ngOnInit(): void {
    this.el.nativeElement.style.display = "block"
    this.el.nativeElement.style.marginTop = "10vh"
    this.el.nativeElement.style.backgroundColor = "#000000b1"
    this.el.nativeElement.style.zIndex = 1000
  }

}
