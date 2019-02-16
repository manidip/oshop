import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
items: any[] = [];
constructor(public itemsMap) {
  for ( let productID in itemsMap) {
    if (itemsMap.hasOwnProperty(productID)) {
      let item = itemsMap[productID];
      this.items.push(new ShoppingCartItem(...item));
    }
  }
}
get totalPrice() {
  let sum = 0;
  for ( let productID in this.items) {
    if (this.items.hasOwnProperty(productID)) {
      sum += this.items[productID].totalPrice;
    }
  }
  return sum;
}
getQuantity(product) {
  if (!this.itemsMap) return 0;
  const item = (this.itemsMap[product.key]) ? this.itemsMap[product.key].quantity : 0;
  return item;
}

totalItemsCount() {
  let count = 0;
  for ( let productID in this.itemsMap ) {
    if (this.itemsMap.hasOwnProperty(productID)) {
      count += this.itemsMap[productID].quantity;
    }
  }
  return count;
}
}
