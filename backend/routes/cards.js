const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { validateCreateCard, validateDeleteCard, validateLikeCard, validateDislikeCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:id', validateDeleteCard, deleteCard);
router.put('/:id/likes', validateLikeCard, likeCard);
router.delete('/:id/likes', validateDislikeCard, dislikeCard);

module.exports = router;