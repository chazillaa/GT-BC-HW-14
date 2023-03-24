const router = require('express').Router()
const withAuth = require('../../utils/auth')

const { User, Post, Comment } = require('../../models/')

router.get('/', async (req, res) => {
    try{
        const getPost = await Post.findAll({
            attributes: ['id', 'post_name', 'post_data', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'user_id', 'post_id', 'comment_data', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        res.json(getPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const getPost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'post_name', 'post_data', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'user_id', 'post_id', 'comment_data', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        if(!getPost){
            res.status(500).json({ message: 'No post associated with this ID.'})
        }
        res.json(getPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try{
        const postPost = await Post.create({
            post_name: req.body.post_name,
            post_data: req.body.post_data,
            user_id: req.session.user_id
        })
        res.json(postPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try{
        const putPost = await Post.update({
            where: {
                id: req.params.id
            }
        })
        if(!putPost){
            res.status(404).json({ message: 'No post associated with this ID.'})
        }
        res.json(putPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if(!deletePost){
            res.status(404).json({ message: 'No post associated with this ID.'})
        }
        res.json(deletePost)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router