import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService, OrderDetails } from '../../services/order/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  currentOrder: OrderDetails | null = null;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getCurrentOrder().subscribe(order => {
      if (order) {
        this.currentOrder = order;
      } else {
        // If no current order, redirect to home
        this.router.navigate(['/']);
      }
    });
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
} 