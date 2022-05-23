const MAX = 1000; //Предел рандомных чисел

let test = document.querySelector('#test');   // Блок с тестом

// Функция разложения числа на простые множители
function prime_factors(n) {
    factors = [];
    // Print the number of two's that divide n
    while (n % 2 === 0)  {
        factors.push(2);
        n /= 2;
    }
    // n must be odd at this point so a skip of 2 ( i = i + 2) can be used
    for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
        // while i divides n , print i ad divide n
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }
    // Condition if n is a prime number greater than 2
    if (n > 2)
        factors.push(n);

    return new Set(factors);
}

// Функция нахождения радикала числа n
function rad(n) {
    result = 1;
    for (let num of prime_factors(n))
         result *= num;
    return result;
}


let questions = []; //Массив ключей (чисел) и значений (их радикалов)

//Заполнение массива рандомными числами и их радикалами
for (let i = 0; i < 5; ++i) {
    let n = Math.floor(Math.random() * MAX) + 1;
    questions.push({
        number: n, // Число
        radical: rad(n), // Его радикал
    });
}

for (let question of questions) {
    let div = document.createElement('div');
    test.appendChild(div);

    let p = document.createElement('p');
    p.innerHTML = "<em>rad(" + question.number + ") = </em>";
    div.appendChild(p);

    let input = document.createElement('input');
    input.dataset.right = question.radical;
    div.appendChild(input);
}      

let button = document.querySelector('#button');
button.addEventListener('click', function() {
let inputs = document.querySelectorAll('#test input');

for (let input of inputs) {
    input.classList.remove('correct'); // удаление класса
    input.classList.remove('incorrect'); // удаление класса

    if (input.value === input.dataset.right) {
        input.classList.add('correct');
    } else {
        input.classList.add('incorrect');
    }
}
});