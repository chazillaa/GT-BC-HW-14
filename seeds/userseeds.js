const { User } = require('../models')

const users = [
    {
        username: 'James',
        email: 'james@gmail.com',
        password: 'password'
    },
    {
        username: 'John',
        email: 'john@gmail.com',
        password: 'password1'
    },
    {
        username: 'Tommy',
        email: 'tommy@gmail.com',
        password: 'password2'
    },
    {
        username: 'Garret',
        email: 'garret@gmail.com',
        password: 'password3'
    },
    {
        username: 'Derrick',
        email: 'derrick@gmail.com',
        password: 'password4'
    },
]

const userSeed = () => User.bulkCreate(users)

module.exports = userSeed