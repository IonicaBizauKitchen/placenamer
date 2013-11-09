var http = require('http');
var fs = require('fs');
var placename = require('placename');
var router = require('router');
var route = router();

route.get('/', function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(fs.readFileSync("index.html", "utf8"));
  res.end();
});

route.get('/search/{location}', function(req, res) {
  placename(req.params.location, function (err, rows) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    });
    res.write(JSON.stringify(rows));
    res.end();
  });
});

http.createServer(route).listen(process.env.PORT || 5000);