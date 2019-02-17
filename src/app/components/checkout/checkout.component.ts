import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  
  cart$: Observable<ShoppingCart>;
  constructor( private shoppingCartService: ShoppingCartService ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  ngOnDestroy() {
    
  }
}
