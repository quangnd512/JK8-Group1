import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {
  @Input('appHighLight') highLight = ''
  constructor(private el: ElementRef) { // cannot receive updated input
    // el.nativeElement.style.backgroundColor = this.highLight
  }

  ngOnInit() : void {
    this.el.nativeElement.style.backgroundColor = this.highLight
  }
}
