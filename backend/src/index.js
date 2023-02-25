var {app, io} = require('./app');
var http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");
const {router} = require("./routes/routes");
const port = process.env.PORT || 3333;

const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', router);
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

io.attach(server);
