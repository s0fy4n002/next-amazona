const express = require('express');
const app = express();
const port = 3000;
// var cors = require('cors');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.100.27:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
