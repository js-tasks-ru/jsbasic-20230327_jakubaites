import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    
    // создаем корневой элемент ribbon div class ='ribbon'
    this.ribbon = document.createElement('div');
    this.ribbon.classList.add('ribbon');

    // создаем стрелки внутри ribbon
    this.arrowLeft = createElement(`
       <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>
    `);
    this.ribbon.append(this.arrowLeft);
    
    this.arrowRight  = createElement(`
       <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>
    `);
    this.ribbon.append(this.arrowRight);
   
    // создаем inner
    this.inner = document.createElement('nav');
    this.inner.classList.add('ribbon__inner');
    this.ribbon.append(this.inner);
    for(let category of this.categories) {
      let categoryElem = createElement(`
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      this.inner.append(categoryElem);
    } 

    // создаем прокрутку inner'a 
    this.ribbon.addEventListener('click', (event) => {
      let scrollLeft = this.inner.scrollLeft;
      let scrollRight = this.inner.scrollWidth - this.inner.scrollLeft - this.inner.clientWidth;
      if(event.target ==  this.arrowLeft) {  // левая кнопка
        this.inner.scrollBy(-350, 0);
        if(!this.arrowRight.classList.contains('ribbon__arrow_visible')) {  // показываем правую кнопку
          this.arrowRight.classList.toggle('ribbon__arrow_visible');
        } else if (scrollLeft < 1) {                                        // убираем левую кнопку
          this.arrowLeft.classList.toggle('ribbon__arrow_visible');
        } 
      } else if (event.target ==  this.arrowRight) { // правая кнопка
        this.inner.scrollBy(350, 0);
        if(!this.arrowLeft.classList.contains('ribbon__arrow_visible')) {  // показываем левую кнопку
          this.arrowLeft.classList.toggle('ribbon__arrow_visible');
        } else if  (scrollRight < 1) {                                        // убираем правую кнопку
          this.arrowRight.classList.toggle('ribbon__arrow_visible');
        } 
      }
    });
    
    // создаем выбор продукта
    this.inner.addEventListener('click', (event) => {
      if(event.target.tagName != 'A') return;
      event.preventDefault();     // прерываем событие по умолчанию
      for(let item of this.inner.querySelectorAll('.ribbon__item')) { // удаляем у всех элементов, если есть, класс ribbon__item_active
        if(item.classList.contains('ribbon__item_active')) {
          item.classList.remove('ribbon__item_active');
        }
      }
      event.target.classList.add('ribbon__item_active');   // добавляем выбранному класс ribbon__item_active
      
      let customE = new CustomEvent('ribbon-select', {     // генерируем кастомное событие
        detail: event.target.dataset.id, 
        bubbles: true 
      });
      event.target.dispatchEvent(customE);
    })
  }
  get elem() {
    return this.ribbon;
  }
}
