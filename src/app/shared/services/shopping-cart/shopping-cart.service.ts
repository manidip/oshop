import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';

import { ShoppingCart } from '../../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-cart/' + cartId).valueChanges().pipe(
      map(cart => {
       return  new ShoppingCart(cart[1]);
      })
    );
  }

  async addToCart(product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }
  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items/').remove();
  }
  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.key);
    const item$ = itemRef.valueChanges();
    item$.pipe(take(1)).subscribe(
      (item: { quantity: number }) => {
        if ( item && (item.quantity + change) === 0) {
          itemRef.remove();
        } else {
          itemRef.update({
            key: product.key,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: ((item) ? item.quantity : 0) + change});
        }
      }
    );
  }
}
