'use strict';

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5555;

app.use(express.static('./public'));

app.get('/index.html', function(request, response) {
  response.sendFile('index.html', { root : './public'});
});

app.get('*', function(request, response){
  response.send('404 Error');
});

app.listen(PORT, function() {
  console.log(`Server is running on localhost:${PORT}`);
});
