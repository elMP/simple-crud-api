const http = require('http');
const crypto = require('crypto');

const host = 'localhost';
const port = 8000;

const persons = [];

const requestListener = function (req, res) {
  //res.setHeader('Content-Type', 'application/json');
  let parseUrl = req.url.split('/');

  switch (req.method) {
    case 'GET':
      if (parseUrl[1] === 'users' && parseUrl[2]) {
        if (
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            parseUrl[2]
          )
        ) {
          let p = findPerson(parseUrl[2]);
          if (p) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(p));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'User not found' }));
          }
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'It is not valid UUID' }));
        }
      } else if (parseUrl[1] === 'users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(persons));
        break;
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Resource not found' }));
      }
      break;
    case 'POST':
      if (parseUrl[1] === 'users') {
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
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(persons[persons.length - 1]));
          } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: 'username, age and hobbies are required fields',
              })
            );
          }
        });
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Resource not found' }));
      }
      break;

    case 'PUT':
      if (parseUrl[1] === 'users' && parseUrl[2]) {
        let data = '';

        req.on('data', (chunk) => {
          data += chunk.toString();
        });

        req.on('end', () => {
          data = JSON.parse(data);

          if (
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
              parseUrl[2]
            )
          ) {
            let p = findPerson(parseUrl[2]);
            if (p) {
              if (checkProperties(data)) {
                p.name = data.name;
                p.age = data.age;
                p.hobbies = data.hobbies;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(p));
              } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: 'username, age and hobbies are required fields',
                  })
                );
              }
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'User not found' }));
            }
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'It is not valid UUID' }));
          }
        });
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Use UUID to update record' }));
      }
      break;

    case 'DELETE':
      if (parseUrl[1] === 'users' && parseUrl[2]) {
        if (
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
            parseUrl[2]
          )
        ) {
          let p = findPerson(parseUrl[2]);
          if (p) {
            deletePerson(p);
            res.statusCode = 204;
            res.setHeader('Content-Type', 'application/json');
            res.end();
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'User not found' }));
          }
        } else {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'It is not valid UUID' }));
        }
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Use UUID to delete record' }));
      }
      break;
    default:
      response.statusCode = 400;
      response.write('No Response');
      response.end();
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

function checkProperties(data) {
  if (!data.username) return false;
  if (!data.age) return false;
  if (!Array.isArray(data.hobbies)) return false;

  return true;
}

function findPerson(id) {
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].id === id) return persons[i];
  }
  return false;
}

function deletePerson(p) {
  let index = -1;
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].id === p.id) index = i;
  }
  persons.splice(index, 1);
}
