import { Pipe, PipeTransform } from '@angular/core';


//Limited the length of the string
@Pipe({
    standalone: true,
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number): string {
        if (value.length > limit) {
            return value.substring(0, limit) + '...';
        }
        return value;
    }
}
