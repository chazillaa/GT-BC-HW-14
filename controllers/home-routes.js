const router = require('express').Router()
const { Post, User, Comment } = require('../models')

router.get('/', async (req, res) => {
    try{
        res.render('login')
        } catch (err){
            res.status(500).json(err)
        }
    })

router.get('/posts/:id', async (req, res) => {
    try{
        const postData = await Post.findAll({
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
        const posts = postData.get({ plain: true })
        res.render('dashboard', { posts,
            logged_in: req.session.logged_in })
        }catch(err){
            res.status(500).json(err)
        }
    })

router.get('/login', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard')
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    // if(req.session.logged_in) {
    //     res.redirect('/')
    //     return
    // }
    res.render('signup')
})

module.exports = router

