import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          
        </h3>
      </div>

      <div class="modal__body">
       
      </div>
    </div>
  </div>
    `);

    // Добавляем события закрытия модального окна
    // button
    this.modal.addEventListener('click', (event) => {    
      if(event.target != this.modal.querySelector('.modal__close')) return;
      this.close();
    });
    // Escape
    
    document.addEventListener('keydown', this.eventEscape);  
    
  }
  
  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').textContent = modalTitle;
  }

  setBody(node) {
    if(this.modal.querySelector('.modal__body').childNodes) { // Кажется я намудрил здесь с проверкой на пустоту?))
      this.modal.querySelector('.modal__body').childNodes.forEach(item => item.remove());
    } 
    this.modal.querySelector('.modal__body').append(node);
  }

  close() {
    document.body.classList.remove('is-modal-open');  // Работает только для слушателя, повешанного на сам эл-т. 
    this.modal.remove();
    document.removeEventListener('keydown', this.eventEscape);
  }

  eventEscape(event) {     // Если не вытащить функцию-обработчик в метод, ее локальная видимость создает ошибку
    if(event.code == `Escape`) {
      this.modal.close();
    }
  }
}
