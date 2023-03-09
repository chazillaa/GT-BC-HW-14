const router = require('express').Router()
const sequelize = require('../config/connection')
const withAuth = require('../utils/auth')

const { Post, User, Comment } = require('../models')

router.get('/', withAuth, async (req,res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
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
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
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
        if(!postData){
            res.status(404).json({ message: 'No post is associated with this ID.'})
        }
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/create', withAuth, (req, res) => {
    res.render('createPost', {loggedIn: req.session.loggedIn})
})

module.exports = router