const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports.validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

module.exports.validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports.validateDeleteCard = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateLikeCard = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateDislikeCard = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateRegistration = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
