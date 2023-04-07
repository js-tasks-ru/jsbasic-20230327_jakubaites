function getMinMax(str) {
  let numArr = str.split(' ')
                  .filter(item => isFinite(item));
  return {
      'min' : Math.min(...numArr),
      "max" : Math.max(...numArr),
  }
     
}
