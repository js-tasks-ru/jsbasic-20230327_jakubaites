import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import CartIcon from '../1-task/index.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item)=> sum + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item)=> sum + (item.product.price * item.count), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
    // Нужен обработчик
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {   
    // верстка окна
    let newModal = new Modal();
    newModal.setTitle('Your order');
    newModal.open();
    
    let div = document.createElement('div');
    for (let item of this.cartItems) {  // add this
      div.append(this.renderProduct(item.product, item.count)); //add this.
    }
    div.append( this.renderOrderForm()); //add this
    
    document.querySelector('.modal__body').append(div);
    
    // add EventListeners 
    // изменение кол-ва товара
    newModal.addEventListener('click', (event) => { // div > newModal
      let plus = newModal.querySelector('.cart-counter__button_plus');
      let minus = newModal.querySelector('.cart-counter__button_minus');
      let productId = event.target.closest('[data-product-id]').getAttribute('data-product-id');
      if(event.target == plus) {
        this.updateProductCount(productId, 1);
      } else if (event.target == minus) {
        this.updateProductCount(productId, -1);
      }
    });
    // слушатель submit
    document.querySelector('form.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    }) 
  }

  onProductUpdate(cartItem) {
    if(!document.body.classList.contains('is-modal-open')) return;
    this.cartIcon.update(this);
    let productId = cartItem.product.id;
    let modalBody = document.querySelector('.modal'); 
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${cartItem.product.price.toFixed(2) * cartItem.count}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    if (this.isEmpty()) {
      newModal.close();
    }
  }

  async onSubmit(event) {
      event.preventDefault();
      document.querySelector('[type="submit"]').classList.add('is-loading');
      let response = await fetch(`https://httpbin.org/post`, {
        method: 'POST',
        body: new FormData(document.querySelector('form.cart-form'))
      });
      // ответ
      if (response.ok) { 
        newModal.setTitle('Success!');
        this.cartItems = [];
        newModal = createElement (`
        <div class="modal__body-inner">
        <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
        </p>
        </div>
        `);
      }

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal(); 
  }
}

