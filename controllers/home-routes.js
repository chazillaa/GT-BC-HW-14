const router = require('express').Router()
const { Post, User, Comment } = require('../models')

router.get('/', async (req, res) => {
    try{
        const getPost = await Post.findAll({
            attributes: [`id`, `post_name`, `created_at`, `post_data`],
            include: [
                {
                    model: Comment,
                    attributes: [`id`, `comment_data`, `post_id`, `user_id`, `created_at`],
                    include: {
                        model: User,
                        attributes: [`name`]
                    }
                },
                {
                    model: User,
                    attributes: [`name`]
                }
            ]
        })
        const posts = getPost.map((post) => post.get({ plain: true }))
        res.render(`homepage`, { posts,
            loggedIn: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [`id`, `post_name`, `created_at`, `post_data`],
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
        const post = postData.get({ plain: true })
        res.render('userpost', { post,
            logged_in: req.session.logged_in })
        }catch(err){
            res.status(500).json(err)
        }
    })

router.get('/login', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('signup')
})

module.exports = router

