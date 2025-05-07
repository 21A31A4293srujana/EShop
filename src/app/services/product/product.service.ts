import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../../model/Product';
import { mockProducts } from '../../mock-data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'api/products'; // Replace with your actual API endpoint
  private useMockData = true; // Set to false when API is ready

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<Product> {
    if (this.useMockData) {
      const product = mockProducts.find(p => p.id === id);
      return of(product as Product);
    }
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    if (this.useMockData) {
      return of([...mockProducts]); // Return a copy of the mock products
    }
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (this.useMockData) {
      const products = mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
      return of(products);
    }
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  searchProducts(query: string): Observable<Product[]> {
    if (this.useMockData) {
      const searchTerm = query.toLowerCase();
      const products = mockProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
      );
      return of(products);
    }
    return this.http.get<Product[]>(`${this.apiUrl}?search=${query}`);
  }
} 