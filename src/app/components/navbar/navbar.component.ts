import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';
import { PopOverComponent } from '../pop-over/pop-over.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchService } from '../../services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CommonModule,
    PopOverComponent,
    SearchBarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isUser: boolean = false;
  searchQuery: string = '';
  quantityOfProductsInCart: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Check authentication status immediately
    this.checkAuthStatus();
    
    // Subscribe to cart items
    this.subscriptions.push(
      this.cartService.cartItems$.subscribe(
        (items) => (this.quantityOfProductsInCart = items.length)
      )
    );
    
    // Subscribe to admin authentication status
    this.subscriptions.push(
      this.authService.isAdminAuthenticate$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
        console.log('Admin status updated:', isAdmin);
      })
    );
    
    // Subscribe to user authentication status
    this.subscriptions.push(
      this.authService.isUserAuthenticate$.subscribe((isUser) => {
        this.isUser = isUser;
        console.log('User status updated:', isUser);
      })
    );
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  // Check authentication status
  checkAuthStatus(): void {
    console.log('Checking auth status...');
    const auth = this.authService.authenticateUser();
    if (auth) {
      auth.subscribe({
        next: (user) => {
          console.log('User authenticated:', user);
          if (user.role === 'USER') {
            this.isUser = true;
          }
          if (user.role === 'ADMIN') {
            this.isAdmin = true;
          }
        },
        error: (error) => {
          console.error('Auth error:', error);
          this.isUser = false;
          this.isAdmin = false;
        }
      });
    } else {
      console.log('No auth token found');
      this.isUser = false;
      this.isAdmin = false;
    }
  }

  openCloseMenu: boolean = false;

  openMenu() {
    this.openCloseMenu = !this.openCloseMenu;
  }

  onSearchChange(searchValue: string) {
    this.searchQuery = searchValue;
    this.searchService.setSearchQuery(searchValue);
  }
}
