var express = require('express');
var app = express();
var fs =require('fs');
var proxyMiddleware = require('http-proxy-middleware');
app.use('/static', express.static('dist/static'));

var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})
app.use('/',function(req,res,next){
  fs.readFile("./dist/static/icpAdmin/index.html",'utf-8',function(err,data){
    if(err){
      throw err ;
    }
    return res.end(data);
  });

})
