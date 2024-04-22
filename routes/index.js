const fs = require('fs');
const { parse } = require('querystring');
const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderCarPage } = require('../views/car');
const { renderPage: renderAddCarPage } = require('../views/add-car');

function handleRequest(request, response) {
    const { method, url } = request;

    switch (url) {
        case '/':
            if (method === 'GET') {
                response.setHeader('Content-Type', 'text/html');
                response.write(renderHomePage());
                response.end();
            }
            break;
        case '/add-car':
            if (method === 'GET') {
                response.setHeader('Content-Type', 'text/html');
                response.write(renderAddCarPage());
                response.end();
            } else if (method === 'POST') {
                let body = '';
                request.on('data', chunk => {
                    body += chunk.toString();
                });
                request.on('end', () => {
                    const formData = parse(body);
                    fs.writeFile('formData.json', JSON.stringify(formData), err => {
                        if (err) {
                            console.error(err);
                            response.statusCode = 500;
                            response.end('Error saving data');
                        } else {
                            response.statusCode = 302;
                            response.setHeader('Location', '/car');
                            response.end();
                        }
                    });
                });
            }
            break;
        case '/car':
            if (method === 'GET') {
                fs.readFile('formData.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        response.statusCode = 500;
                        response.end('Error reading data');
                    } else {
                        response.setHeader('Content-Type', 'text/html');
                        response.write(renderCarPage(data));
                        response.end();
                    }
                });
            }
            break;
        default:
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html');
            response.write('404 Page Not Found');
            response.end();
    }
}

module.exports = handleRequest;
