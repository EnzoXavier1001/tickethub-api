const { Router } = require("express")

const ServicesController = require("../controllers/ServicesController")

const servicesRoutes = Router()

const servicesController = new ServicesController()

servicesRoutes.get("/", servicesController.show)
servicesRoutes.post("/", servicesController.create)
servicesRoutes.put("/:id", servicesController.update)

module.exports = servicesRoutes