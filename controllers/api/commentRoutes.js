const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Post comment to blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment from blog
router.delete('/:id', async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.json(deleteComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;