import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import CartProduct from '../../model/CartProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  subTotal: number = 0;
  total: number = 0;
  @Input() products: CartProduct[] = [];
  
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.cartService.total$.subscribe((value) => {
      this.subTotal = value.subtotal;
      this.total = value.total;
    });
    this.cartService.cartItems$.subscribe((items: CartProduct[]) => {
      this.products = items;
    });
  }
  
  addressForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    surname: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    address: new FormControl<string>('', [Validators.required]),
    postalCode: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    country: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^[\d]{10}$/),
    ]),
  });

  addressSubmit() {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      const orderDetails = {
        shippingDetails: {
          name: formValue.name || '',
          surname: formValue.surname || '',
          address: formValue.address || '',
          postalCode: formValue.postalCode || '',
          city: formValue.city || '',
          country: formValue.country || '',
          email: formValue.email || '',
          phone: formValue.phone || ''
        },
        products: this.products,
        total: this.total,
        subtotal: this.subTotal
      };
      
      // Create order using the order service
      this.orderService.createOrder(orderDetails);
      
      // Clear the cart after successful order
      this.cartService.clearCart();
      
      // Navigate to order confirmation page
      this.router.navigate(['/order-confirmation']);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.addressForm.controls).forEach(key => {
        const control = this.addressForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  public get name() {
    return this.addressForm.get('name');
  }
  public get surname() {
    return this.addressForm.get('surname');
  }
  public get address() {
    return this.addressForm.get('address');
  }
  public get postalCode() {
    return this.addressForm.get('postalCode');
  }
  public get city() {
    return this.addressForm.get('city');
  }
  public get country() {
    return this.addressForm.get('country');
  }
  public get email() {
    return this.addressForm.get('email');
  }
  public get phone() {
    return this.addressForm.get('phone');
  }

  formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formatter.format(price);
  }
}
