import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import CatalogProduct from '../../model/CatalogProduct';
import { CartService } from '../../services/cart/cart.service';
import CartProduct, { GenericToastProps, Severity } from '../../model/CartProduct';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-shop-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TabViewModule, AccordionModule, CurrencyPipe] as const,
  templateUrl: './shop-product-details.component.html',
  styleUrl: './shop-product-details.component.scss',
})
export class ShopProductDetailsComponent implements OnInit {
  @Input() product!: CatalogProduct;

  productForm = new FormGroup({
    productId: new FormControl(''),
    productName: new FormControl(''),
    productTitle: new FormControl(''),
    productDescription: new FormControl(''),
    productPrice: new FormControl(0),
    productCategory: new FormControl(''),
    productColor: new FormControl('', Validators.required),
    productImageUrl: new FormControl(''),
    productCreatedAt: new FormControl(new Date()),
    productUpdatedAt: new FormControl(new Date())
  });

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  productIsNotAvailable: boolean = false;

  ngOnInit(): void {
    // Initialize form with product data
    this.productForm.patchValue({
      productId: this.product.id,
      productName: this.product.name,
      productTitle: this.product.title,
      productDescription: this.product.description,
      productPrice: this.product.price,
      productCategory: this.product.category,
      productColor: this.product.color,
      productImageUrl: this.product.imageUrl,
      productCreatedAt: this.product.createdAt,
      productUpdatedAt: this.product.updatedAt
    });
    
    // Check if product is available
    this.productIsNotAvailable = this.product.stockQuantity < 1;
  }

  createNewcartItem(): CartProduct {
    return new CartProduct(
      this.product.id,
      this.product.name,
      this.product.title,
      this.product.description,
      this.product.price,
      this.product.category,
      this.product.brand,
      this.product.color,
      this.product.imageUrl,
      this.product.specifications,
      [], // Empty array for details
      Severity.success
    );
  }

  addProductToCart(): void {
    this.productForm.get('productColor')?.markAsTouched();
    if (this.productForm.valid) {
      this.cartService.addToCart(this.product);
      this.toastService.displayGenericToast({
        severity: Severity.success,
        summary: 'Success',
        detail: 'Product added to cart',
      });
    }
  }

  addProductToFavorites(): void {
    const genericToastProps: GenericToastProps = {
      severity: Severity.success,
      summary: 'Product Saved',
      detail: 'Product added to your favorites',
    };
    this.toastService.displayGenericToast(genericToastProps);
  }
}