import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ManufacturingComponent } from '../../components/manufacturing/manufacturing.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { Router } from '@angular/router';

// Import the CatalogProduct model
import CatalogProduct from '../../model/CatalogProduct';

// Mock products data
export const mockProducts: CatalogProduct[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    title: 'Latest iPhone with A17 Pro chip',
    description: 'The most powerful iPhone ever with a titanium design, A17 Pro chip, and advanced camera system.',
    price: 134999.00,
    stockQuantity: 50,
    category: 'Smartphones',
    brand: 'Apple',
    specifications: {
      dimensions: '146.6 x 70.6 x 8.25 mm',
      weight: '187g',
      warranty: '1 year',
      features: ['A17 Pro chip', 'Titanium design', '48MP camera', 'USB-C']
    },
    color: 'Titanium',
    imageUrl: 'assets/images/products/iphone15pro.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ... other products
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    CarouselComponent,
    ManufacturingComponent,
    BannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featuredProducts: CatalogProduct[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      title: 'Latest iPhone with A17 Pro chip',
      description: 'The most powerful iPhone ever with a titanium design, A17 Pro chip, and advanced camera system.',
      price: 134999.00,
      stockQuantity: 50,
      category: 'Smartphones',
      brand: 'Apple',
      specifications: {
        dimensions: '146.6 x 70.6 x 8.25 mm',
        weight: '187g',
        warranty: '1 year',
        features: ['A17 Pro chip', 'Titanium design', '48MP camera', 'USB-C']
      },
      color: 'Titanium',
      imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283816',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'MacBook Pro 16"',
      title: 'Powerful laptop for professionals',
      description: '16-inch MacBook Pro with M3 Pro chip, 18GB unified memory, and 512GB SSD storage.',
      price: 249999.00,
      stockQuantity: 30,
      category: 'Laptops',
      brand: 'Apple',
      specifications: {
        dimensions: '355.7 x 248.1 x 16.8 mm',
        weight: '2.1 kg',
        powerConsumption: '100W',
        warranty: '1 year',
        features: ['M3 Pro chip', '18GB unified memory', '512GB SSD', 'Liquid Retina XDR display']
      },
      color: 'Space Gray',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor(private router: Router) {}
}
