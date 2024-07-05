const { Router } = require("express")

const CustomersController = require("../controllers/CustomersController")
const userIsAuthenticated = require("../middlewares/authMiddleware")

const customersRoutes = Router()

const customersController = new CustomersController()

customersRoutes.get("/", customersController.show)
customersRoutes.post("/", userIsAuthenticated, customersController.create)
customersRoutes.put("/:id", userIsAuthenticated, customersController.update)

module.exports = customersRoutes