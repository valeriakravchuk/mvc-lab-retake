const express = require('express');
const router = express.Router();
const path = require('path');
const cheerio = require('cheerio');

let cars = [];
let nextId = 1;

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'car.html');
    if (cars.length === 0) {
        res.sendFile(filePath);
    } else {
        const car = cars[cars.length - 1];
        const html = `<h2>Last added car</h2><div><span class="bold">Make:</span> ${car.make}</div><div><span class="bold">Model:</span> ${car.model}</div><div><span class="bold">Year:</span> ${car.year}</div><div><span class="bold">Color:</span> ${car.color}</div>`;
        const $ = cheerio.load(html);
        res.send($.html());
    }
});

router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-car.html'));
});

router.get('/list', (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'cars-list.html');
    if (cars.length === 0) {
        res.sendFile(filePath);
    } else {
        const $ = cheerio.load('<ul></ul>');
        cars.forEach(car => {
            $('ul').append(`<li><p><span class="bold">Make:</span> ${car.make}</p><p><span class="bold">Model:</span> ${car.model}</p><p><span class="bold">Year:</span> ${car.year}</p><p><span class="bold">Color:</span> ${car.color}</p></li>`);
        });
        res.send($.html());
    }
});

router.post('/add', (req, res) => {
    const { make, model, year, color } = req.body;
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    res.redirect('/car');
});

module.exports = router;
