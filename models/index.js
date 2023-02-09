const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// Blog belongs to User with the foreignKey of user_id
Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Blog has many comments with the foreignKey of blog_id
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

// Comment belongs to User with the foreignKey of user_id
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Blog,
  Comment
};