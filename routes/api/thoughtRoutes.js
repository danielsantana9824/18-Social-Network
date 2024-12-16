const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

// /api/thought/:thoughtId
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thought/:thoughtId/thoughts/:reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .patch(updateThought)
  .delete(deleteThought);

module.exports = router;
