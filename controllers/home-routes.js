const router = require('express').Router()
const { Post, User, Comment } = require('../models')
const withAuth = require('../utils/auth')

// get all posts with GET and load to homepage// postman working 
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          
        ],
      })
      const posts = postData.map((post) => post.get({ plain: true }))
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      })
    } catch (err) {
      res.status(500).json(err)
    }
  })

// get single post
router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'post_name', 'created_at', 'post_data'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_data', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    })
      .then((postData) => {
        if (postData) {
          const post = postData.get({ plain: true })
  
          res.render('post', {
            post,
            logged_in: req.session.logged_in,
          })
        } else {
          res.status(404).end()
        }
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  })

// login with GET 
router.get('/login', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('login')
})

// signup with GET 
router.get('/signup', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/')
        return
    }
    res.render('signup')
})

module.exports = router

