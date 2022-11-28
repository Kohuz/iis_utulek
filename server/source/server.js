const express = require('express');
var cors = require('cors');
const token = require('./helpers/token');

// Express Application, it is a global variable, that takes options for the
// whole backend and it also executes everything.
const app = express();
app.use(express.json());
app.use(cors());

// This way there is going to be automatic authentication to all API calls
app.use('/api', (req, res, next) => {
  // We want to be able to login with our current API
  if (
    req.url == '/v1/user/login' ||
    req.url == '/v1/user/login/' ||
    req.url == '/v1/animal' ||
    req.url == '/v1/animal/' ||
    req.url == '/v1/user/register' ||
    req.url == '/v1/user/register/'
  ) {
    next();
  } else {
    token.authenticate(req, res, next);
  }
});

require('./routes/user.routes')(app);
require('./routes/event.routes')(app);
require('./routes/animal.routes')(app);
require('./routes/request.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT + '.');
});
