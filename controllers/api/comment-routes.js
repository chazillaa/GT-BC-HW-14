const router = require('express').Router()
const withAuth = require('../../utils/auth')
const sequelize = require(`../../config/connection`)
const { Comment } = require('../../models')

router.get('/', withAuth, async (req, res) => {
    try{
        const getComment = await Comment.findAll()
        res.json(getComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', withAuth, async (req, res) => {
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

router.post('/', withAuth, async (req, res) => {
    try{
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

router.put('/:id', withAuth, async (req, res) => {
    try{
        const putComment = await Comment.update({
            where: {
                id: req.params.id
            }
        })
        if (!putComment) {
            res.status(404).json({ message: 'No comment associated with that ID.'})
        }
        res.json(putComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router