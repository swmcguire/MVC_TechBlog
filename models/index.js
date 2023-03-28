const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: 'CASCADE', 
});

Blog.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignLey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.bleongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Blog, Comment };