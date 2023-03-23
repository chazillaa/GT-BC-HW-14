const router = require('express').Router()
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection')

router.get('/', async (req, res) => {
    try{
        const getUser = await User.findAll({
            attributes: { exclude: 'password'}
        })
        res.json(getUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        const getUserId = await User.findOne({
            attributes: { exclude: 'password'},
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'post_name', 'post_data', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_data', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['post_name']
                    }
                }
            ]
        })
        if(!getUserId){
            res.status(404).json({ message: 'No user associated with this ID.'})
            return
        }
        res.json(getUserId)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    try{
        const postUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.user_id = postUser.id,
            req.session.name = postUser.name,
            req.session.logged_in = true
            res.json(postUser)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try{
        const postLogin = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!postLogin) {
            res.status(404).json({ message: 'Email was not found.'})
            return
        }
        const passwordCheck = postLogin.checkPassword(req.body.password)
        if(!passwordCheck){
            res.status(400).json({ message: 'Password was incorrect.'})
            return
        }
        req.session.save(() => {
            req.session.user_id = postLogin.id,
            req.session.logged_in = true

            res.json({ user: postLogin, message: 'You are now logged in.'})
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    try{
        const putUser = await User.update({
            where: {
                id: req.params.id
            }
        })
        if (!putUser) {
            res.status(404).json({ message: 'Email was not found.'})
            return
        }
        res.json(putUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if(!deleteUser){
            res.status(404).json({ message: 'Email was not found.'})
            return
        }
        res.json(deleteUser)
    } catch (err) {
        res.json(500).json(err)
    }
})

router.post('/logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(400).end()
    }
})

module.exports = router

