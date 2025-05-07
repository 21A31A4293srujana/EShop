import { Component, OnInit } from '@angular/core';
import { ElectronicsCardComponent } from '../../components/electronics-card/electronics-card.component';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from '../../services/product-service/product.service';
import CatalogProduct from '../../model/CatalogProduct';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ElectronicsCardComponent, AccordionModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private messageService: MessageService
  ) {}

  listOfProducts: CatalogProduct[] = [];
  filteredProducts: CatalogProduct[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.loadProducts();
    
    // Subscribe to search query changes
    this.searchService.searchQuery$.subscribe((query: string) => {
      this.filterProducts(query);
    });
  }

  private loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products: CatalogProduct[]) => {
        this.listOfProducts = products;
        this.filteredProducts = products;
        this.loading = false;
        console.log('Products loaded from API:', this.listOfProducts);
      },
      error: (error: any) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products. Please try again later.'
        });
        console.error('Error loading products:', error);
      }
    });
  }

  private filterProducts(query: string) {
    if (!query.trim()) {
      this.filteredProducts = this.listOfProducts;
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    this.filteredProducts = this.listOfProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
}
