import { ToastService } from '../../services/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import CartProduct from '../../model/CartProduct';

@Component({
  selector: 'app-cart-toast',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Listen for product addition to cart and trigger toast display
    this.toastService.displaytoast$.subscribe((value: CartProduct) => {
      this.showConfirm(value);
    });
  }

  showConfirm(product: CartProduct) {
    // Display toast with product details
    this.messageService.add({
      key: 'confirm',
      sticky: false,
      severity: 'success',
      data: product, // Pass product data to the toast
      life: 3000, // Show for 3 seconds
    });
  }

  onReject() {
    // Clear the toast message
    this.messageService.clear('confirm');
  }

  navigateCartPage() {
    // Navigate to the cart page when the "View Cart" button is clicked
    this.router.navigate(['cart']);
    this.messageService.clear('confirm');
  }
}
