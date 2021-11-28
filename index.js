const http = require('http');
const crypto = require('crypto');

const host = 'localhost';
const port = 8000;

const persons = [];

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/person':
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(persons));
          break;
        default:
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Resource not found' }));
      }
      break;
    case 'POST':
      let data = '';

      req.on('data', (chunk) => {
        data += chunk.toString();
      });

      req.on('end', () => {
        data = JSON.parse(data);
        let uuid = crypto.randomUUID();
        data.id = uuid;

        persons.push(data);
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(persons));
      });
      break;

    case 'PUT':
      break;

    case 'DELETE':
      break;
    default:
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});