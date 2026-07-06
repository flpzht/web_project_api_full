const Card = require('../models/cards');

const CREATED = 201;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid card data' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(FORBIDDEN).send({ message: 'You are not the owner of this card' });
      }
      return Card.findByIdAndDelete(req.params.id)
        .then((deletedCard) => {
          if (!deletedCard) {
            return res.status(NOT_FOUND).send({ message: 'Card not found' });
          }
          return res.send({ data: deletedCard });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      if (err.statusCode === FORBIDDEN) {
        return res.status(FORBIDDEN).send({ message: 'You are not the owner of this card' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid card ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
    });
};