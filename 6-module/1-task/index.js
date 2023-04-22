/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows; 
    this.table = document.createElement('table');
    for (let item of this.rows) {
      this.table.insertAdjacentHTML('beforeEnd','<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td><td><button>X</button></td></tr>');
    }
    this.table.addEventListener('click', function(event) {
      if(event.target.tagName != 'BUTTON') return;
      event.target.closest('tr').remove();
    });
  }
  get elem() {
    return this.table;
  }
}
