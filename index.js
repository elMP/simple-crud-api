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

        if (checkProperties(data)) {
          let uuid = crypto.randomUUID();
          data.id = uuid;

          persons.push(data);
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(persons));
        }
        else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: 'name, age and hobbies are required fields' }));
        }
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

function checkProperties(data) {
  if (!data.name)
    return false;
  if (!data.age)
    return false;
  if (!Array.isArray(data.hobbies) || !data.hobbies.length)
    return false;

  return true;
}