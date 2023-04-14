function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', function (e){
    this.hidden = true;
  });
}
