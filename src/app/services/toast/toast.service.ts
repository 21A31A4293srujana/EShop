import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import CartProduct, { GenericToastProps } from '../../model/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private displayToast = new Subject<CartProduct>();
  displaytoast$ = this.displayToast.asObservable();

  private genericToast = new Subject<GenericToastProps>();
  genericToast$ = this.genericToast.asObservable();

  showCartToast(product: CartProduct): void {
    this.displayToast.next(product);
  }

  displayGenericToast(genericToastProps: GenericToastProps) {
    this.genericToast.next(genericToastProps);
  }
}
