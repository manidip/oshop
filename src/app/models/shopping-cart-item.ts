import { Product } from './product';
export class ShoppingCartItem {
  constructor(private product, private quantity: number) {
  }
  get totalPrice() {
    return this.quantity * this.product.price;
  }
}
