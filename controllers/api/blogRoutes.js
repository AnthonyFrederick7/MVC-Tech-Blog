const router = require('express').Router();
const { Blog } = require('../../models/');
const withAuth = require('../../utils/auth');

// Post blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update blog
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows != 0) {
      res.json(affectedRows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteBlog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });
    if (!deleteBlog) {
      res.status(404);
      return;
    }
    res.json(deleteBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;