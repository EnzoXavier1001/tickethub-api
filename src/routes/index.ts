const { Router } = require("express")

const servicesRouter = require('./service.routes')
const usersRouter = require('./user.routes')
const categoriesRouter = require('./category.routes')
const levelsRouter = require("./level.routes")
const customersRouter = require("./customer.routes")

const routes = Router()

routes.use("/services", servicesRouter)
routes.use("/users", usersRouter)
routes.use("/categories", categoriesRouter)
routes.use("/levels", levelsRouter)
routes.use("/customers", customersRouter)

module.exports = routes