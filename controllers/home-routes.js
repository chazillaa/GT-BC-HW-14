const router = require('express').Router()
const sequelize = require('../config/connection')

const { Post, User, Comment } = require('../models')

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'post_name', 'content', 'created_at'],
            iniclude: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_data', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const post = postData.map((post) => post.get({ plain: true }))
        res.render('homepage', { post,
            loggedIn: req.session.loggedIn })
        }catch(err){
            res.status(500).json(err)
        }
    })

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes: ['id', 'post_name', 'content', 'created_at'],
            iniclude: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_data', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const post = postData.map((post) => post.get({ plain: true }))
        res.render('postId', { post,
            loggedIn: req.session.loggedIn })
        }catch(err){
            res.status(500).json(err)
        }
    })

router.get('./login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
})

router.get('./signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('signup')
})

module.exports = router

