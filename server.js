var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');



// var app = express();


// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

  let dbConfig = require('./database/db');


// Routes to Handle Request
const userRoute = require('./routes/user.route')


// MongoDB Setup
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)

// Setup Express.js
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());



// API Route
app.use('/api', userRoute)


// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})


// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
 
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
