import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$: Observable<any>;
  constructor(private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    this.orders$ = await this.authService.user$.pipe(
      switchMap(  user => this.orderService.getOrdersByUser(user.uid) )
    )
  }
}
