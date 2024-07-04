const { Router } = require("express")

const ServicesController = require("../controllers/ServicesController")
const userIsAuthenticated = require("../middlewares/authMiddleware")

const servicesRoutes = Router()

const servicesController = new ServicesController()

servicesRoutes.get("/", userIsAuthenticated, servicesController.show)
servicesRoutes.post("/", userIsAuthenticated, servicesController.create)
servicesRoutes.put("/:id", userIsAuthenticated, servicesController.update)

module.exports = servicesRoutes