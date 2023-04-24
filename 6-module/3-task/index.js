import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    
    /* create div carousel*/
    this.carousel = document.createElement('div');
    this.carousel.classList.add('carousel');
  
    /*create arrow left/right*/
    this.arrowRight = createElement(`
     <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
     </div>`);
     this.carousel.append(this.arrowRight);
     this.arrowLeft = createElement(`
     <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
     </div>`);
     this.carousel.append(this.arrowLeft);

     /*create inner*/
     this.inner = document.createElement('div');
     this.inner.classList.add('carousel__inner');
     this.carousel.append(this.inner);

     /*create slides*/
    for(let slide of this.slides) {
      this.slideElem = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
       <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
       <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
       <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
       </button>
      </div>
      </div>`);
      this.inner.append(this.slideElem);
    };

    /*create eventListener*/
    this.widthSlide = 500; //this.inner.offsetWidth/this.slides.length и this.slideElem.offsetWidth не работают. Видимо элементы еще не созданы 
    this.counter = 1;
    this.position = 0;
      
    this.arrowLeft.style.display = 'none';

    this.carousel.addEventListener('click', (event) => {
    if(event.target == this.arrowRight) {
    this.position -= this.widthSlide;
    this.inner.style.transform = `translateX(${this.position}px)`;
    ++this.counter;
    if (this.counter == 2) {
      this.arrowLeft.style.display = '';
    } else if (this.counter == this.slides.length) {
        this.arrowRight.style.display = 'none';
       } 
      }
      if(event.target == this.arrowLeft) {
        this.position += this.widthSlide;
        this.inner.style.transform = `translateX(${this.position}px)`;
        --this.counter;
      if (this.counter == 1) {
        this.arrowLeft.style.display = 'none';
      } else if (this.counter == this.slides.length - 1) {
        this.arrowRight.style.display = '';
       } 
      }
  });

  /*create customEvent*/
  this.carousel.addEventListener('click', function(e) {
    if(e.target.tagName != 'BUTTON') return;
    let event = new CustomEvent('product-add', { 
      detail: e.target.closest('.carousel__slide').dataset.id, 
      bubbles: true,
    });
    e.target.dispatchEvent(event);
   });
  }
  get elem() {
    return this.carousel;
  }
}
