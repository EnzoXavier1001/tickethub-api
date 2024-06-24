const { Router } = require("express")

const servicesRouter = require('./service.routes')
const usersRouter = require('./user.routes')
const categoriesRouter = require('./category.routes')

const routes = Router()

routes.use("/services", servicesRouter)
routes.use("/users", usersRouter)
routes.use("/categories", categoriesRouter)

module.exports = routes