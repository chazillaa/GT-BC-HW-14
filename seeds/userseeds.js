const { User } = require('../models')

const users = [
    {
        name: 'james',
        email: 'james@gmail.com',
        password: 'password'
    },
    {
        name: 'john',
        email: 'john@gmail.com',
        password: 'password1'
    },
    {
        name: 'tommy',
        email: 'tommy@gmail.com',
        password: 'password2'
    },
    {
        name: 'garret',
        email: 'garret@gmail.com',
        password: 'password3'
    },
    {
        name: 'derrick',
        email: 'derrick@gmail.com',
        password: 'password4'
    },
]

const userSeed = () => User.bulkCreate(users)

module.exports = userSeed