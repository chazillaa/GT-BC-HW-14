const userSeed = require('./userseeds')
const postSeed = require('./postseeds')
const commentSeed = require('./commentseeds')

const sequelize = require('../config/connection')

const seedAll = async () => {
    await sequelize.sync({ force: true })
    await userSeed()
    await postSeed()
    await commentSeed()
    process.exit(0)
}

seedAll()