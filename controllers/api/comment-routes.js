const router = require('express').Router()

const { Comment } = require('../../models')

// find all comments with GET // postman working
router.get('/', async (req, res) => {
    try{
        const getComment = await Comment.findAll()
        res.json(getComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

// find comment by ID with GET // postman working
router.get('/:id', async (req, res) => {
    try{
        const commentId = await Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!commentId){
            res.status(404).json({ message: 'No comment associated with that ID.'})
        }
        res.json(commentId)
    } catch (err) {
        res.status(500).json(err)
    }
})

// add comment with POST // postman working but not showing up in views
router.post('/', async (req, res) => {
    try {
      const postComment = await Comment.create({
        comment_data: req.body.comment_data,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      })
      res.json(postComment)
    } catch (err) {
      res.status(500).json(err)
    }
  })

module.exports = router