import { Injectable } from '@angular/core';
import CatalogProduct from '../../model/CatalogProduct';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { mockProducts } from '../../mock-product-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = environment.apiURL + '/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<CatalogProduct[]> {
    // Use mock data instead of making an HTTP request
    return of(mockProducts).pipe(
      tap((products) => {
        console.log('Products fetched:', products);
      }),
      catchError((error) => {
        console.error('Error fetching products', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }

  getProductById(productId: string): Observable<CatalogProduct> {
    // Find the product in the mock data
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      return of(product).pipe(
        tap((product) => {
          console.log('Product fetched:', product);
        }),
        catchError((error) => {
          console.error('Error fetching product', error);
          return throwError(() => new Error('Failed to fetch product'));
        })
      );
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }

  upDateProduct(catalogProduct: CatalogProduct): Observable<CatalogProduct> {
    // For mock implementation, just return the product
    return of(catalogProduct).pipe(
      tap((product) => {
        console.log('Product updated:', product);
      }),
      catchError((error) => {
        console.error('Error updating product', error);
        return throwError(() => new Error('Failed to update product'));
      })
    );
  }

  deleteProduct(productId: string): Observable<void> {
    // For mock implementation, return success
    return of(void 0).pipe(
      tap(() => {
        console.log('Product deleted:', productId);
      }),
      catchError((error) => {
        console.error('Error deleting product', error);
        return throwError(() => new Error('Failed to delete product'));
      })
    );
  }
}
