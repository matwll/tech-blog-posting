const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "user_name",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_name",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_name",
});

Comment.belongsTo(User, {
  foreignKey: "user_name",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
