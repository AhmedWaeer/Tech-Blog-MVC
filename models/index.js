const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})


Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'cascade'
})


Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'cascade'

})


module.exports = { User, Comment, Post }