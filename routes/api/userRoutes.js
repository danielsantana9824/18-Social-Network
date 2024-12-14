const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/user/:userId/friends/:friend
router.route('/:userId/friends/:friend').delete(removeFriend);

module.exports = router;
