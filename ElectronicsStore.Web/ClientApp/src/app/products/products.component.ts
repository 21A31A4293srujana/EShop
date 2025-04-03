import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  sortBy: string = '';
  editingProduct: Product | null = null;
  isAdmin = true; // For testing, you should implement proper admin authentication
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stock: 0,
    rating: 0,
    reviews: 0
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(product =>
        product.category === this.selectedCategory
      );
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case '-price':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  addToCart(product: Product): void {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', product);
    alert(`Added ${product.name} to cart`);
  }

  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0) {
      alert('Please fill in all required fields correctly');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: (product) => {
        this.products.push(product);
        this.applyFilters(); // Refresh the filtered list
        this.resetNewProduct();
        alert('Product added successfully!');
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      }
    });
  }

  startEdit(product: Product): void {
    this.editingProduct = { ...product };
  }

  saveEdit(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct).subscribe(
        () => {
          this.loadProducts();
          this.editingProduct = null;
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  private resetNewProduct(): void {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: '',
      stock: 0,
      rating: 0,
      reviews: 0
    };
  }
}