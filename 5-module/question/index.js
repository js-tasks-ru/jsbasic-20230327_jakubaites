function initCarousel() {
  let container = document.querySelector('[data-carousel-holder]'),
      inner = document.querySelector('.carousel__inner'),
      slides = document.querySelectorAll('.carousel__slide'),
      arrowRight = document.querySelector('.carousel__arrow_right'),
      arrowLeft = document.querySelector('.carousel__arrow_left'),
      widthSlide = inner.offsetWidth / slides.length,
      counter = 1,
      position = 0;
      
      arrowLeft.style.display = 'none';

     container.addEventListener('click', function(event) {
      if(event.target == arrowRight) {
      position -= widthSlide;
      inner.style.transform = `translateX(${position}px)`;
      ++counter;
      if (counter == 1) {
      arrowLeft.style.display = '';
      } else if (counter == slides.length) {
      arrowRight.style.display = 'none';
       } 
      }
      if(event.target == arrowLeft) {
      position += widthSlide;
      inner.style.transform = `translateX(${position}px)`;
      --counter;
      if (counter == 1) {
       arrowLeft.style.display = 'none';
      } else if (position == slides.length - 1) {
       arrowRight.style.display = '';
       } 
      }
  });
}
