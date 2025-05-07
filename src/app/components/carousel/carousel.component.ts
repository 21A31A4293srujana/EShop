import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service/product.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import CatalogProduct from '../../model/CatalogProduct';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, ButtonModule, TagModule],
  providers: [ProductService],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() inputProducts: CatalogProduct[] = [];
  products: CatalogProduct[] = [];

  responsiveOptions: any[] | undefined;

  currentIndex = 0;
  itemsPerView = 2;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // If no input products are provided, fetch from service
    if (this.inputProducts.length === 0) {
      this.productService
        .getProducts()
        .subscribe((products) => {
          this.products = products;
          console.log('Products loaded:', this.products); // Debug log
        });
    } else {
      this.products = this.inputProducts;
      console.log('Input products received:', this.products); // Debug log
    }
    
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputProducts'] && !changes['inputProducts'].firstChange) {
      this.products = this.inputProducts;
      console.log('Products updated:', this.products); // Debug log
    }
  }

  prev(): void {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
  }

  next(): void {
    this.currentIndex = Math.min(this.products.length - this.itemsPerView, this.currentIndex + 1);
  }

  goToDetails() {}
}
