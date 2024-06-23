const { Router } = require("express")

const servicesRouter = require('./service.routes')

const routes = Router()

routes.use("/services", servicesRouter)

module.exports = routes