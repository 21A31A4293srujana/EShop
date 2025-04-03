import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>Welcome to Electronics Store</h1>
        <p>Discover Amazing Deals on Latest Electronics</p>
        <button mat-raised-button color="primary" routerLink="/products">
          Shop Now <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="categories-section">
      <h2>Featured Categories</h2>
      <div class="category-grid">
        <mat-card *ngFor="let category of categories" [routerLink]="['/products']">
          <img [src]="category.image" [alt]="category.name">
          <mat-card-content>
            <h3>{{category.name}}</h3>
            <p>{{category.description}}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>

    <!-- Special Offers -->
    <div class="offers-section">
      <h2>Special Offers</h2>
      <div class="offers-grid">
        <mat-card *ngFor="let offer of specialOffers">
          <div class="offer-content">
            <div class="offer-text">
              <h3>{{offer.title}}</h3>
              <p>{{offer.description}}</p>
              <button mat-raised-button color="accent" routerLink="/products">
                Shop Now
              </button>
            </div>
            <img [src]="offer.image" [alt]="offer.title">
          </div>
        </mat-card>
      </div>
    </div>

    <!-- Features -->
    <div class="features-section">
      <div class="feature" *ngFor="let feature of features">
        <mat-icon>{{feature.icon}}</mat-icon>
        <h3>{{feature.title}}</h3>
        <p>{{feature.description}}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                  url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      margin-bottom: 40px;
    }

    .hero-content {
      h1 {
        font-size: 3rem;
        margin-bottom: 20px;
      }

      p {
        font-size: 1.5rem;
        margin-bottom: 30px;
      }

      button {
        padding: 10px 30px;
        font-size: 1.2rem;
      }
    }

    .categories-section, .offers-section {
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;

      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 30px;
        color: #333;
      }
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      
      mat-card {
        cursor: pointer;
        transition: transform 0.3s;

        &:hover {
          transform: translateY(-5px);
        }

        img {
          height: 200px;
          object-fit: cover;
          width: 100%;
        }

        h3 {
          margin: 16px 0 8px;
          font-size: 1.2rem;
        }
      }
    }

    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .offer-content {
        display: flex;
        align-items: center;
        padding: 20px;

        .offer-text {
          flex: 1;
          padding-right: 20px;
        }

        img {
          width: 120px;
          height: 120px;
          object-fit: cover;
        }
      }
    }

    .features-section {
      background-color: #f5f5f5;
      padding: 40px 20px;
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      text-align: center;
      max-width: 1200px;
      margin: 40px auto;

      .feature {
        padding: 20px;

        mat-icon {
          font-size: 40px;
          height: 40px;
          width: 40px;
          color: #1976d2;
        }

        h3 {
          margin: 16px 0;
          color: #333;
        }
      }
    }
  `]
})
export class HomeComponent {
  categories = [
    {
      name: 'Smartphones',
      description: 'Latest smartphones from top brands',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Laptops',
      description: 'High-performance laptops for work and gaming',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Smart TVs',
      description: '4K and 8K Smart TVs with latest technology',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      name: 'Audio Devices',
      description: 'Premium sound quality headphones and speakers',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  specialOffers = [
    {
      title: 'Summer Sale',
      description: 'Get up to 40% off on selected smartphones',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60'
    },
    {
      title: 'Student Discount',
      description: 'Special prices on laptops for students',
      image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60'
    }
  ];

  features = [
    {
      icon: 'local_shipping',
      title: 'Free Delivery',
      description: 'Free shipping on orders above ₹500'
    },
    {
      icon: 'security',
      title: 'Secure Payment',
      description: '100% secure payment methods'
    },
    {
      icon: 'support_agent',
      title: '24/7 Support',
      description: 'Round the clock customer support'
    },
    {
      icon: 'replay',
      title: 'Easy Returns',
      description: '10-day return policy'
    }
  ];
}