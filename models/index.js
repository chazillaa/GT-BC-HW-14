const User = require('./user')
const Post = require('./post')
const Comment = require ('./comment')

// Posts belongs to User
User.hasMany(Post, {
    foreignKey: 'user_id'
})
Post.belongsTo(User, {
    foreignKey: 'user_id'
})
// Comment belongs to User
User.hasMany(Comment, {
    foreignKey: 'user_id'
})
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
// Post belongs to comment
Post.hasMany(Comment, {
    foreignKey: 'user_id'
})
Comment.belongsTo(Post, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment }