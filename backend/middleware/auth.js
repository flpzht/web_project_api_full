const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: 'Unauthorized' });

};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
