const { Comment } = require('../models')

const comments = [
    {
        comment_data: 'I dont belive it!',
        user_id: 1,
        post_id: 3
    },
    {
        comment_data: 'Thats insane!',
        user_id: 3,
        post_id: 5
    },
    {
        comment_data: 'No way this is true.',
        user_id: 5,
        post_id: 4
    },
    {
        comment_data: 'I never would have expected to see this.',
        user_id: 4,
        post_id: 1
    },
    {
        comment_data: 'The tech world is just insane!',
        user_id: 2,
        post_id: 2
    },
]

const commentSeed = () => Comment.bulkCreate(comments)

module.exports = commentSeed