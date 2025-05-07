import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [],
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.scss',
})
export class RecapComponent implements OnInit {
  subTotal: number = 0;
  total: number = 0;
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.cartService.total$.subscribe((value) => {
      this.subTotal = value.subtotal;
      this.total = value.total;
    });
  }
  getTotalvalue() {
    this.router.navigate(['/checkout']);
    console.log(this.total);
  }
}
