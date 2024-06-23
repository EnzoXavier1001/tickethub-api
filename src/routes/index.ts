const { Router } = require("express")

const servicesRouter = require('./service.routes')
const usersRouter = require('./user.routes')

const routes = Router()

routes.use("/services", servicesRouter)
routes.use("/users", usersRouter)

module.exports = routes