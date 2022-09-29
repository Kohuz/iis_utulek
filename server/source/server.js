const http = require('http');

const requestListener = function(req, res) {
    res.writeHead(200);
    const response = {
        test: "Test",
    };
    res.end(JSON.stringify(response));
}

function startServer() {
    const server = http.createServer(requestListener);
    server.listen(8080);
}

startServer();
