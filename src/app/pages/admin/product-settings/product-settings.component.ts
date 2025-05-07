import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product-service/product.service';
import CatalogProduct, { ProductSpecifications } from '../../../model/CatalogProduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit {
  productForm: FormGroup;
  productId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      imageUrl: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      specifications: this.fb.group({
        dimensions: [''],
        weight: [''],
        powerConsumption: [''],
        warranty: [''],
        features: [[]]
      })
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product: CatalogProduct) => {
          this.productForm.patchValue({
            name: product.name,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            brand: product.brand,
            color: product.color,
            imageUrl: product.imageUrl,
            stockQuantity: product.stockQuantity,
            specifications: product.specifications || {
              dimensions: '',
              weight: '',
              powerConsumption: '',
              warranty: '',
              features: []
            }
          });
        },
        error: (error: Error) => {
          console.error('Error loading product:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditMode && this.productId) {
        this.productService.upDateProduct({ ...productData, id: this.productId } as CatalogProduct).subscribe({
          next: () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error: Error) => {
            console.error('Error updating product:', error);
          }
        });
      } else {
        this.productService.upDateProduct(productData as CatalogProduct).subscribe({
          next: () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error: Error) => {
            console.error('Error creating product:', error);
          }
        });
      }
    }
  }
}
