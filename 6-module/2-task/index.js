import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elemProduct = createElement(`
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    </div>`);
  this.elemProduct.addEventListener('click', function(e) {
    if(e.target.tagName != 'BUTTON') return;
    let event = new CustomEvent('product-add', { 
      detail: product.id, // Это точно правильно? Ведь тут this будет указывать на this.elemProduct?
      bubbles: true,
    });
    e.target.dispatchEvent(event);
   });
 }
 get elem() {
  return this.elemProduct;
 }
}