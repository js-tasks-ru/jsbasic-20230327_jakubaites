import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // carousel
    this.carousel = new Carousel(slides);
    document.querySelector('div[data-carousel-holder]').append(this.carousel.elem);
    // ribbonMenu
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('div[data-ribbon-holder]').append(this.ribbonMenu.elem);
    // stepSlider
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('div[data-slider-holder]').append(this.stepSlider.elem);
    // cartIcon
    this.cartIcon = new CartIcon();
    document.querySelector('div[data-cart-icon-holder]').append(this.cartIcon.elem);
    // cart
    this.cart = new Cart(this.cartIcon);
    // запрос товаров
    let response = await fetch('products.json');
    this.products = await response.json();
    // productsGrid
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector('div[data-products-grid-holder]').innerHTML = ''; // очищаем заглушки
    document.querySelector('div[data-products-grid-holder]').append(this.productsGrid.elem);
    // фильтрация товаров
    this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
    });
    // Пользовательские события
    document.body.addEventListener('product-add', (event) =>{
        let selectedProduct = this.products.find(item => item.id == event.detail);
        this.cart.addProduct(selectedProduct);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
        this.productsGrid.updateFilter({maxSpiciness: event.detail});
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) =>{  // error
        this.productsGrid.updateFilter({category: event.detail});
    });
    // Фильтрация по изменению чекбоксов
    document.getElementById('nuts-checkbox').addEventListener('change', (event) =>{   //error
        this.productsGrid.updateFilter({noNuts: event.target.checked});
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) =>{
        this.productsGrid.updateFilter({vegeterianOnly: event.target.checked});
    });

  }
}
