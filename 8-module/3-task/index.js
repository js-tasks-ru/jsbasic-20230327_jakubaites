//import CartIcon  from '../1-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(product === null || typeof product != 'object') return;
    let cartItem = {
      product: product,
    };
    if(!this.cartItems.includes(cartItem)) {
      cartItem.count = 1; 
      this.cartItems.push(cartItem);
    } else {
      let index = this.cartItems.indexOf(product);
      ++this.cartItems[index].count;
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
   let cartItem = this.cartItems.find(item => item.product.id = productId);
   let index = this.cartItems.indexOf(cartItem);
   if(amount == 1) {
    ++this.cartItems[index].count;
   } else if (amount == -1) {
    --this.cartItems[index].count;
    if(this.cartItems[index].count == 0) {
      this.cartItems.splice(index, 1);
    }
   }
   this.onProductUpdate(this.cartItems[index]);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item)=> sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item)=> sum + (item.product.price * item.count), 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

