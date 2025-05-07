import { Pipe, PipeTransform } from '@angular/core';
import CatalogProduct from '../../model/CatalogProduct';

@Pipe({
  name: 'stockstatus',
  standalone: true,
})
export class StockstatusPipe implements PipeTransform {
  transform(product: CatalogProduct): string {
    if (product.stockQuantity <= 0) {
      return 'Out of Stock';
    } else if (product.stockQuantity <= 5) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  }
}
