const router = require('express').Router()
const withAuth = require('../utils/auth')

const { Post, User, Comment } = require('../models')

router.get('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'post_name', 'created_at', 'post_data'],
            iniclude: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_data', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        const posts = postData.map(post => post.get({ plain: true }))
        res.render('dashboard', {posts, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/edit/:id', withAuth, async (req,res) => {
    try{
        const postData = await Post.findOne({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'post_name', 'post_data', 'created_at'],
            iniclude: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_data', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        if(!postData){
            res.status(404).json({ message: 'No post is associated with this ID.'})
        }
        const posts = postData.get({ plain: true })
        res.render('dashboard', {posts, logged_in: req.session.logged_in})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/create', withAuth, (req, res) => {
    res.render('createPost', {logged_in: req.session.logged_in})
})

module.exports = router