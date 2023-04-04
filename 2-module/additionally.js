let obj = {
    name: "James",
    surname: "Bond",
    age: 40,
};

for (let i = 0; i < Object.keys(obj).length; i++) {
    let prop = Object.keys(obj)[i];
    console.log('Значение свойств:', obj[prop]);
}