function highlight(table) {
  let rows = table.querySelectorAll('tr');
  for(let row of rows ) {
    let cells = row.querySelectorAll('td');
    if(cells[1].innerHTML < 18) {
      row.style.textDecoration = 'line-through';
    }
    if(cells[2].innerHTML == 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }
    if(cells[3].dataset.available == "true") {
      row.classList.add('available');
    } else if (cells[3].dataset.available == 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }
  }
}
