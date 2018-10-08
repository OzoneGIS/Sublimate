var app = require('express')();
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');

var server = require('http').Server(app);

app.use(fileUpload());

server.listen(8056);

mongoose.connect('mongodb+srv://adarian:x4Do7yB6ZPzDWE7O@sublimate0-cq4s9.gcp.mongodb.net/main?retryWrites=true');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');

});

var template = require('../api/template.js');
app.get('/template', template.get);

var upload = require('../api/upload.js');
app.post('/', upload.post);

