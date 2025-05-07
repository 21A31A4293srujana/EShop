import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/Product';
import CatalogProduct from '../../model/CatalogProduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  quantity: number = 1;
  selectedSpecifications: { [key: string]: string } = {};
  availableSpecifications: { [key: string]: string[] } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  get hasSpecifications(): boolean {
    return Object.keys(this.availableSpecifications).length > 0;
  }

  navigateBack(): void {
    this.router.navigate(['/shop']);
  }

  formatPrice(price: number): string {
    // Convert to Indian format (e.g., 1,00,000.00) and multiply by 10
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(price * 10);
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  updateSpecification(key: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSpecifications[key] = select.value;
  }

  addToCart(): void {
    if (this.product) {
      const catalogProduct: CatalogProduct = {
        id: this.product.id,
        name: this.product.name,
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        stockQuantity: this.product.stockQuantity,
        category: this.product.category,
        brand: this.product.brand,
        specifications: this.product.specifications,
        color: this.product.color,
        imageUrl: this.product.imageUrl,
        createdAt: this.product.createdAt,
        updatedAt: this.product.updatedAt
      };
      this.cartService.addToCart(catalogProduct);
      this.router.navigate(['/cart']);
    }
  }

  private loadProduct(id: string): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        if (product.specifications) {
          this.availableSpecifications = this.getAvailableSpecifications(product.specifications);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.isLoading = false;
      }
    });
  }

  private getAvailableSpecifications(specs: any): { [key: string]: string[] } {
    const available: { [key: string]: string[] } = {};
    for (const [key, value] of Object.entries(specs)) {
      if (Array.isArray(value)) {
        available[key] = value;
      }
    }
    return available;
  }
} 