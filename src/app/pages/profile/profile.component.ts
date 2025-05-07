import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService, OrderDetails } from '../../services/order/order.service';
import { AuthService } from '../../services/auth/auth.service';

// Define the UserAuth interface locally since it's not exported from the service
interface UserAuth {
  id: string;
  email: string;
  username: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  orderHistory: OrderDetails[] = [];
  isLoading: boolean = true;
  loading: boolean = true;
  error: string | null = null;
  user: UserAuth | null = null;

  constructor(
    private orderService: OrderService,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadOrderHistory();
  }

  loadUser() {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user profile';
        this.loading = false;
        console.error('Error loading user:', err);
      }
    });
  }

  loadOrderHistory() {
    this.isLoading = true;
    this.orderService.getOrderHistory().subscribe({
      next: (orders) => {
        this.orderHistory = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading order history:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToShop() {
    this.router.navigate(['/']);
  }

  viewOrderDetails(order: OrderDetails) {
    this.router.navigate(['/order-details', order.orderNumber]);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
