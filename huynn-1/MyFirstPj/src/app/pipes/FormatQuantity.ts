import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  standalone: true,
  name: 'format_quantity'
})
export class FormatQuantity implements PipeTransform {
  transform(value: any, separator: string = '.'): any {
    if (typeof value === 'number') {
      return this.formatNumber(value, separator);
    }

    return value;
  }

  private formatNumber(value: number, separator: string): string {
    const formattedNumber = new Intl.NumberFormat('en-US').format(value);

    return formattedNumber.replace(/,/g, separator);
  }
}
