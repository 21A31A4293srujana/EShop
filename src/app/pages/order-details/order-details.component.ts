import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService, OrderDetails } from '../../services/order/order.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: OrderDetails | null = null;
  isLoading: boolean = true;
  orderNumber: string = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderNumber = this.route.snapshot.paramMap.get('orderNumber') || '';
    
    if (!this.orderNumber) {
      this.router.navigate(['/profile']);
      return;
    }
    
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.isLoading = true;
    this.orderService.getCurrentOrder().subscribe(order => {
      if (order && order.orderNumber === this.orderNumber) {
        this.order = order;
      } else {
        // If the order doesn't match or doesn't exist, redirect to profile
        this.router.navigate(['/profile']);
      }
      this.isLoading = false;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(price * 10);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
} 