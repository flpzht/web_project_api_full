const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser, getCurrentUser } = require('./controllers/users');
const { validateRegistration, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegistration, createUser);

app.use(auth);

app.use('/users', users);
app.use('/users/me', getCurrentUser);
app.use('/cards', cards);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
