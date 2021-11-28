const http = require('http');

const host = 'localhost';
const port = 8000;

const persons = JSON.stringify([
  { id: '1', name: 'Perer Roo', age: 25, hobbies: ['tennis', 'gaming'] },
  { id: '2', name: 'Puth the Bear', age: 42, hobbies: ['honey'] }
]);

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/person':
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          //res.write(JSON.stringify(persons));
          res.end(persons);
          break;
        default:
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Resource not found' }));
      }
      break;
    case 'POST':
      res.writeHead(200);
      res.end(JSON.stringify({ error: 'post request' }));
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