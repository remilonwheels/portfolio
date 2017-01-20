'use strict';

const express = require('express');
const requestProxy = require('express-request-proxy');
const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.static('./public'));

function proxyGitHub(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`}
  }))(request, response);
}

//API calls
app.get('/github/*', proxyGitHub);

//Site navigation
app.get('/', function(request, response) {
  response.sendFile('index.html', { root : './public'});
});
app.get('/me', function(request, response) {
  response.sendFile('index.html', { root : './public'});
});
app.get('/work', function(request, response) {
  response.sendFile('index.html', { root : './public'});
});
app.get('/contact', function(request, response) {
  response.sendFile('index.html', { root : './public'});
});


app.get('*', function(request, response){
  response.send('404 Error');
});

app.listen(PORT, function() {
  console.log(`Server is running on localhost:${PORT}`);
});
