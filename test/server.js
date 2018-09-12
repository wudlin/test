var express = require('express');
var app = express();

app.use('/swagger', express.static('public'))
// app.use('../swagger', express.static('swagger-editor-master'))
// app.use(express.static(__dirname + '../swagger-editor-master'))
app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("swagger start", host, port)

})