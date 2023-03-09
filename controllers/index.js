const router = require('express').Router()
const apiRoutes = require('./api')
const homeRoutes = require('./home-routes.js')
const dashRoutes = require('./dashboard-routes.js')

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', dashRoutes)

module.exports = router