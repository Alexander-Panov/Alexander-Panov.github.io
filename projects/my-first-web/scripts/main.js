// var myHeading = document.querySelector('h2');
// myHeading.textContent = "Hello, World!";

let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/Firefox-logo-2019.png') {
        myImage.setAttribute('src', 'images/firefox2.png');
    } else if (mySrc === 'images/firefox2.png') {
        myImage.setAttribute('src', 'images/firefox3.png');
    } else if (mySrc === 'images/firefox3.png') {
        myImage.setAttribute('src', 'images/firefox4.png');
    } else {
        myImage.setAttribute('src', 'images/Firefox-logo-2019.png');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h2');

function setUserName() {
    var myName = prompt('Пожалуйста, введите свое имя');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Сайте на Mozilla крутые, ' + myName;
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Сайте на Mozilla крутые, ' + storedName;
}

myButton.onclick = function() {
    setUserName();
  }
