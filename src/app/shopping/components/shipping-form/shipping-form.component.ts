import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order/order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { ShippingForm } from '../../models/shipping-form';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('shopping-cart') cart: ShoppingCart;
  shipping: ShippingForm = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  userSubscription: Subscription;
  userId: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart );
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
