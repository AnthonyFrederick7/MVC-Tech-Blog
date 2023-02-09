const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();