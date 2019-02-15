import { ShoppingCart } from './../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-cart/' + cartId).valueChanges().pipe(
      map(cart => {
       return  new ShoppingCart(cart[1]);
      })
    );
  }

  private getItem(cartId: string, productId: string) {
    return  this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId)
      return cartId;
    console.log('getOrCreateCartId');
    const result = await this.create();
    localStorage.setItem('cartId', result.key );
    return result.key;
  }

  async addToCart(product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.key);
    const item$ = itemRef.valueChanges();
    item$.pipe(take(1)).subscribe(
      item => {
        if ( item && (item.quantity + change) === 0) {
          itemRef.remove();
        } else {
          itemRef.update({product: product, quantity: ((item) ? item.quantity : 0) + change});
        }
      }
    );
  }
}
