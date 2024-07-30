import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readable',
  standalone: true,
})
export class ReadablePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
        .split(/[_-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
}
