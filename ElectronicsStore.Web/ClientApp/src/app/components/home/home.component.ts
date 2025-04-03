import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    // TODO: Replace with actual API call
    this.featuredProducts = [
      {
        id: 1,
        name: 'Smart TV',
        description: '4K Ultra HD Smart LED TV',
        price: 699.99,
        imageUrl: '/assets/products/tv.jpg'
      },
      {
        id: 2,
        name: 'Refrigerator',
        description: 'Energy Star Rated French Door Refrigerator',
        price: 1299.99,
        imageUrl: '/assets/products/fridge.jpg'
      },
      {
        id: 3,
        name: 'Washing Machine',
        description: 'Front Load Washer with Steam',
        price: 799.99,
        imageUrl: '/assets/products/washer.jpg'
      }
    ];
  }

  addToCart(product: Product) {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  }
}
