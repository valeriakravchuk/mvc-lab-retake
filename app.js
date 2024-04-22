const http = require('http');
const htmlGenerator = require('./htmlGenerator');
const carsModule = require('./cars');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    const cars = carsModule.getCars();
    console.log(cars);

    const htmlStart = htmlGenerator.getHTMLDocumentStart();
    const htmlEnd = htmlGenerator.getHTMLDocumentEnd();

    res.write(htmlStart);
    res.write('<body>');

    const carInfo = carsModule.getCarInformation(1);
    res.write(`<p>${carInfo}</p>`);

    const carAge = carsModule.getCarAge(1);
    res.write(`<p>${carAge}</p>`);

    res.write('</body>');
    res.write(htmlEnd);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});