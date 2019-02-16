import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

 async placeOrder(order) {
   let result = await this.db.list('/orders').push(order);
   this.shoppingCartService.clearCart();
   return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(
      map(
        items => {
          return items.map( a => {
              const key = a.payload.key;
              const data = { key, ...a.payload.val() };
              return  data ;
          });
        })
    );
  }
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userID').equalTo(userId))
    .snapshotChanges()
    .pipe(
      map(
        items => {
          return items.map( a => {
              const key = a.payload.key;
              const data = { key, ...a.payload.val() };
              return  data ;
          });
        })
    );
  }
}
