import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import CartProduct from '../../model/CartProduct';

export interface OrderDetails {
  orderNumber: string;
  orderDate: Date;
  shippingDetails: {
    name: string;
    surname: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
  };
  products: CartProduct[];
  total: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private currentOrder = new BehaviorSubject<OrderDetails | null>(null);
  private orderHistory = new BehaviorSubject<OrderDetails[]>([]);

  constructor() {
    // Load order history from localStorage if available
    const savedHistory = localStorage.getItem('orderHistory');
    if (savedHistory) {
      this.orderHistory.next(JSON.parse(savedHistory));
    }
  }

  createOrder(orderDetails: Omit<OrderDetails, 'orderNumber' | 'orderDate'>): OrderDetails {
    const order: OrderDetails = {
      ...orderDetails,
      orderNumber: this.generateOrderNumber(),
      orderDate: new Date()
    };

    // Update current order
    this.currentOrder.next(order);

    // Add to order history
    const currentHistory = this.orderHistory.value;
    this.orderHistory.next([order, ...currentHistory]);

    // Save to localStorage
    localStorage.setItem('orderHistory', JSON.stringify([order, ...currentHistory]));

    return order;
  }

  getCurrentOrder(): Observable<OrderDetails | null> {
    return this.currentOrder.asObservable();
  }

  setCurrentOrder(order: OrderDetails): void {
    this.currentOrder.next(order);
  }

  getOrderHistory(): Observable<OrderDetails[]> {
    return this.orderHistory.asObservable();
  }

  private generateOrderNumber(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
} 