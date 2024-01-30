import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFormatVnd]'
})
export class FormatVndDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any): void {
    let inputValue: string = event.target.value;
    inputValue = this.formatCurrency(inputValue);
    event.target.value = inputValue;
  }

  private formatCurrency(value: string): string {
    const numericValue: number = parseFloat(value.replace(/[^\d\.]/g, ''));
    return numericValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
}
