const router = require('express').Router();
const { User } = require('../../models');

// Makes user
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Logs user in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validPassword = await userData.checkPassword(req.body.password);

    if (!userData || !validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You have logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Logs user out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404);
  }
});

module.exports = router;