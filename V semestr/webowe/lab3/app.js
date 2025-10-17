const express = require('express');
const path = require('path');
const config = require('./config').config;
const service = require('./service');

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, '/'));

app.get('/', (request, response) => {
    let chart1_data = {
        "type": "line",
        "data": {
            "labels": ["January", "February", "March", "April", "May", "June"],
            "datasets": [{
                "label": "My First dataset",
                "backgroundColor": "rgb(255, 99, 132)",
                "borderColor": "rgb(255, 99, 132)",
                "data": [0, 10, 5, 2, 20, 30, 45]
            }]
        },
        "options": {}
    };

    const tempData = `Czas,Temperatura
2023-11-09 10:00:00,10
2023-11-09 11:00:00,13
2023-11-09 12:00:00,16
2023-11-09 13:00:00,18
2023-11-09 14:00:00,19
2023-11-09 15:00:00,19
2023-11-09 16:00:00,17`;

    const dataChart2 = service.convertData(tempData);

    const products = [
        { name: 'Laptop', price: 1000 },
        { name: 'Smartphone', price: 500 },
        { name: 'Tablet', price: 300 }
    ];

    response.render('index.html', {
        subject: 'Technologie aplikacji webowych',
        chart1: JSON.stringify(chart1_data),
        chart2: JSON.stringify(dataChart2),
        products: products
    });
});

app.get('/template/:variant/:a/:b', (req, res) => {
    const { variant, a, b } = req.params;
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let result;
    let operationSymbol = '';

    switch (variant) {
        case 'sum': result = numA + numB; operationSymbol = '+'; break;
        case 'sub': result = numA - numB; operationSymbol = '-'; break;
        case 'multiply': result = numA * numB; operationSymbol = '*'; break;
        case 'divide': result = (numB === 0) ? 'Error: Division by zero' : (numA / numB); operationSymbol = '/'; break;
        default: result = 'Error: Invalid variant';
    }

    let chartData = [];
    if (typeof result === 'number') {
        for (let i = 0; i <= 10; i++) {
            let y;
            switch (variant) {
                case 'sum': y = i + numB; break;
                case 'sub': y = i - numB; break;
                case 'multiply': y = i * numB; break;
                case 'divide': y = numB !== 0 ? i / numB : 0; break;
            }
            chartData.push({ x: i, y: y });
        }
    }

    res.render('result.html', {
        a: numA,
        b: numB,
        variant: variant,
        operation: operationSymbol,
        result: result,
        chartData: JSON.stringify(chartData)
    });
});


app.listen(config.port, function () {
  console.info(`Server is running at port ${config.port}`);
});