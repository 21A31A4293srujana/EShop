import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(stockStatus: string): string {
    if (stockStatus === 'Out of Stock') {
      return 'background-red';
    }
    if (stockStatus === 'Low Stock') {
      return 'background-orange';
    }
    if (stockStatus === 'In Stock') {
      return 'background-green';
    }
    return '';
  }
}
