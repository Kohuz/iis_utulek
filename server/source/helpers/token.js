const dotenv = require('dotenv');
const webtoken = require('jsonwebtoken');

const TOKEN = {
  debug: {
    log: (msg) => {
      console.log('token:', msg);
    },
  },
  init: () => {
    dotenv.config();
    process.env.TOKEN_SECRET; // could it be moved to a variable in TOKEN?
  },
};
TOKEN.init();

exports.generateAccess = (id, role) => {
  return webtoken.sign(
    {
      id: id,
      role: role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '20000s' }
  );
};

// Express callback functions for token authentication, because of that it
// has a third argument, next.
exports.authenticate = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    res.status(401).send({
      message: 'Token does not exists',
    });
    return;
  }

  // It is not needed from this point and it complicates existing code
  delete req.query.token;

  webtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    TOKEN.debug.log(err);
    if (err) {
      res.status(403).send({
        message: 'Failed to verify token',
      });
      return;
    }

    // User is logged in
    req.user = user;
    next();
  });
};
