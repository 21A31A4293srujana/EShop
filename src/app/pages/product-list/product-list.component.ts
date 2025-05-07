import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  selectedCategory: string = 'all';
  categories: string[] = ['all', 'Televisions', 'Appliances', 'Small Appliances', 'Smart Home', 'Audio'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;
    
    if (this.selectedCategory === 'all') {
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products. Please try again later.';
          this.isLoading = false;
          console.error('Error loading products:', err);
        }
      });
    } else {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load products. Please try again later.';
          this.isLoading = false;
          console.error('Error loading products:', err);
        }
      });
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadProducts();
  }

  formatPrice(price: number): string {
    // Convert to Indian format (e.g., 1,00,000.00) and multiply by 10
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(price * 10);
  }
} 