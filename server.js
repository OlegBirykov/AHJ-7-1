const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('I am server');
});

const port = 7070;
// слушаем определённый порт
server.listen(port, (err) => {
  if (err) {
    console.log('Error occured:', err);
    return;
  }
  console.log(`server is listening on ${port}`);
});
