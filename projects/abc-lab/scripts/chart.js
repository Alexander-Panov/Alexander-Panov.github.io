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
    for (let num of prime_factors_list[n])
         result *= num;
    return result;
}

//Взаимно ли просты три числа?
function not_mutual_primes(a,b,c) {
    let fa = prime_factors_list[a], fb = prime_factors_list[b], fc = prime_factors_list[c];
	var intersection = function(set1, set2) { return new Set([...set1].filter(x => set2.has(x))); };
    return intersection(fa, fb).size == 0 && intersection(fa, fc).size == 0 && intersection(fb, fc).size == 0;
}
//Проверка условий теоремы на множество всех чисел до N
function calculate(n, S) {
    prime_factors_list = new Array(2*n+2);
    rad_list = new Array(2*n+2);
    for (let p = 1; p < 2*n+2; ++p) {
        prime_factors_list[p] = new Set(prime_factors(p));
        rad_list[p] = rad(p);
    }
    let cnt = 0;
    for(let a = 1; a < n; ++a) {
        for(let b = a; b < n; ++b) {
            let c = a+b;
            if (c >= (rad_list[a]*rad_list[b]*rad_list[c])**S && not_mutual_primes(a, b, c)) {
                cnt += 1;
            }
        }
    }
    return cnt;
}


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let plots = [['Quantity', 'ABC quantity']];
    for (let i = 1; i < 11; ++i) {
        plots.push([i*100, calculate(i*100, 1)]);
    }
    var data = google.visualization.arrayToDataTable(plots);

    var options = {
        title: 'Количество ABC-троек на общее количество троек',
        hAxis: {title: 'Все тройки'},
        vAxis: {title: 'ABC-тройки'},
        legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('myChart'));

    chart.draw(data, options);
}