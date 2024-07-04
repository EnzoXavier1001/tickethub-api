const { Router } = require("express")

const CustomersController = require("../controllers/CustomersController")
const userIsAuthenticated = require("../middlewares/authMiddleware")

const customersRoutes = Router()

const customersController = new CustomersController()

customersRoutes.get("/", userIsAuthenticated, customersController.show)

module.exports = customersRoutes