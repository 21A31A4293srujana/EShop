import { CommonModule } from '@angular/common';
import CatalogProduct from '../../../model/CatalogProduct';
import { StockstatusPipe } from '../../../pipes/status/stockstatus.pipe';
import { StatusColorPipe } from '../../../pipes/statusColor/status-color.pipe';
import { ProductService } from './../../../services/product-service/product.service';
import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import CartProduct, { Severity } from '../../../model/CartProduct';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, StatusColorPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: CatalogProduct[] = [];
  searchInput: string = '';
  searchInputProduct: CatalogProduct[] = [];
  isLoading: boolean = false;
  
  constructor(
    private productService: ProductService, 
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.searchInputProduct = [...products];
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.toastService.displayGenericToast({
          severity: Severity.error,
          summary: 'Error',
          detail: 'Failed to load products. Please try again later.'
        });
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  getStockStatus(quantity: number): string {
    if (quantity <= 0) {
      return 'Out of Stock';
    } else if (quantity <= 5) {
      return 'Low Stock';
    } else {
      return 'In Stock';
    }
  }

  searchProduct(value: string) {
    if (!value.trim()) {
      this.searchInputProduct = [...this.products];
      return;
    }
    
    const searchTerm = value.toLowerCase().trim();
    this.searchInputProduct = this.products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  }

  redirectToProductSettings(id: string) {
    this.router.navigate([`/admin/${id}`]);
  }

  editProduct(product: CatalogProduct) {
    this.router.navigate([`/admin/product-settings/${product.id}`]);
  }

  deleteProduct(product: CatalogProduct) {
    this.isLoading = true;
    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastService.displayGenericToast({
          severity: Severity.success,
          summary: 'Product Deleted',
          detail: `${product.name} has been deleted successfully.`
        });
        
        // Remove the product from both arrays
        this.products = this.products.filter(p => p.id !== product.id);
        this.searchInputProduct = this.searchInputProduct.filter(p => p.id !== product.id);
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.toastService.displayGenericToast({
          severity: Severity.error,
          summary: 'Error',
          detail: 'Failed to delete product. Please try again later.'
        });
        console.error('Error deleting product:', error);
        this.isLoading = false;
      }
    });
  }
}
