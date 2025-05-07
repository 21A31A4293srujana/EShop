import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import CartProduct from '../../model/CartProduct';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss',
})
export class CartCardComponent {
  constructor(private cartService: CartService) {}

  @Input() product!: CartProduct;

  addItem(): void {
    this.product.quantity += 1;
    if (this.product.quantity > 10) this.product.quantity = 10;
    this.cartService.calculateTotal();
  }
  
  removeItem(): void {
    this.product.quantity -= 1;
    if (this.product.quantity < 1) {
      this.product.quantity = 0;
      this.cartService.removeFromCart(this.product.id);
    }
    this.cartService.calculateTotal();
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.product.id);
  }

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(price * 10);
  }
}
