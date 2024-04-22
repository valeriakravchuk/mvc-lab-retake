const http = require('http');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

const server = http.createServer(routes);

server.on('listening', () => {
    console.log(`Server is running on ${PORT}.`);
});

server.listen(PORT);