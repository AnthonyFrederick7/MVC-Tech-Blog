const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');
// const { Blog } = require('../models/');
const withAuth = require('../utils/auth');

// Gets the dashboard data if authorized
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
        where: {
          user_id: req.session.user_id
        }
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('allBlogsAdmin', {
      layout: 'dashboard',
      blogs,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// Gets a new blog data if authorized
router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('newBlog', {
    layout: 'dashboard',
  });
});

// Gets the blogs id and with authorization, edit blog
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    if (blogData) {
      const blog = blogData.get({ plain: true });
      res.render('editBlog', {
        layout: 'dashboard',
        blog,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

// Gets all blogs
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    let logged_in = req.session.logged_in;

    res.render('allBlogs', { blogs, logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets an individual blog page by primary key
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
  
    if (blogData) {
      const blog = blogData.get({ plain: true });

      let user = {name: req.session.username, id: req.session.user_id};

      let logged_in = req.session.logged_in;

      res.render('singleBlog', { blog, user, logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets login page if not logged in, if logged in redirect to homepage
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Gets signup page if not logged in, if logged in redirect to homepage
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;