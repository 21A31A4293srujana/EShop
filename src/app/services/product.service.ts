import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone X',
      description: 'Latest smartphone with advanced features',
      price: 999.99,
      category: 'Phones',
      imageUrl: 'assets/images/smartphone.jpg'
    },
    {
      id: 2,
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals',
      price: 1499.99,
      category: 'Laptops',
      imageUrl: 'assets/images/laptop.jpg'
    },
    {
      id: 3,
      name: 'Wireless Earbuds',
      description: 'High-quality wireless earbuds',
      price: 199.99,
      category: 'Audio',
      imageUrl: 'assets/images/earbuds.jpg'
    }
  ];

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
} 